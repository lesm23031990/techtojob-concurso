"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative field of small graph clusters ("mini-grafos") painted on a 2D
 * canvas. Replaces the earlier single rotating cloud (D33): the request was a
 * background that never stops moving, reacts to the pointer and reads as many
 * little graphs spread over the whole hero — with the copy left breathing in
 * the middle.
 *
 * Why a client component: pointer reaction + a render loop are impossible in a
 * Server Component. It is the ONLY client island of the hero; every other hero
 * animation is pure CSS.
 *
 * Why no 3D library: three.js/WebGL would add ~300 KB for a background
 * decoration and put the Lighthouse Performance gate (≥95) at risk.
 *
 * Visual language:
 * - LAYERS: three depth layers; far clusters are smaller, dimmer and move less
 *   with the pointer (parallax), which buys depth without a 3D engine.
 * - CLUSTERS: local graphs (a hub linked to 4–5 vertices plus a couple of
 *   chords). Each one drifts on its own slow orbit with its own phase, so the
 *   background is always moving but never marches in lockstep. The graph span is
 *   ~300px on a 1440 viewport (half of the first 6× build) while the vertices
 *   stay tiny: short links + small glowing points is what reads as a graph.
 * - VERTICES: every point is a tiny core (2–3px radius) inside a wide, faint
 *   halo, so it looks like a glowing point rather than a drawn circle.
 * - COPY FIRST: clusters carry a soft bias away from the centre column
 *   (|x| ≥ 0.35) and anything that lands near the text is dimmed by the
 *   elliptical text-protection dip → the headline keeps breathing.
 * - CURSOR: per-layer parallax plus a local field that pushes and brightens the
 *   points around the pointer, easing back when it leaves.
 *
 * Performance guards (all mandatory):
 * - DPR capped at 1.5 and cluster count stepped by breakpoint;
 * - edges live inside their cluster (a handful per cluster, never global O(n²));
 * - per-frame buffers are reused and edge strokes are batched into alpha
 *   buckets → no colour-string allocation per edge;
 * - rendering pauses when the hero is offscreen (IntersectionObserver) or the
 *   tab is hidden (visibilitychange);
 * - `prefers-reduced-motion: reduce` paints ONE static frame: no rAF loop, no
 *   pointer listeners at all (WCAG 2.3.3, R34);
 * - absolute positioned + aria-hidden + pointer-events-none → CLS 0, no impact
 *   on LCP (the H1 paints first), no screen-reader noise, never steals clicks.
 */

type NodeKind = "dust" | "brand" | "ember";

/** One dot of a cluster; offsets are relative to the cluster centre. */
type Node = {
  offsetX: number;
  offsetY: number;
  kind: NodeKind;
  /** Twinkle phase (radians) so dots never blink in sync. */
  phase: number;
};

/** A small local graph: its own drift, its own nodes, its own edges. */
type Cluster = {
  baseX: number;
  baseY: number;
  layer: number;
  driftPhase: number;
  driftSpeed: number;
  orbit: number;
  nodes: Node[];
  links: Array<[number, number]>;
};

const DUST_RGB = "195, 205, 205"; // cloud #c3cdcd — the star-dust majority
const BRAND_RGB = "132, 192, 191"; // brand #84c0bf
const EMBER_RGB = "244, 162, 97"; // ember #f4a261 — support accent only (R25)

/** Depth layers: far = smaller, dimmer, less pointer travel.
 *  IMPORTANT: the 6× of this revision (D33) is the GRAPH SPAN (`CLUSTER_SPREAD`),
 *  not the vertex size. A graph reads as a graph because of long links between
 *  small points — big discs read as blobs, so the vertices stay tiny (2–3px
 *  radius) and only their soft halo grows. */
const LAYERS = [
  { radius: 1.8, alpha: 0.6, parallax: 10 },
  { radius: 2.2, alpha: 0.75, parallax: 20 },
  { radius: 2.6, alpha: 0.85, parallax: 36 },
] as const;

const CLUSTERS_MOBILE = 6;
const CLUSTERS_DESKTOP = 8;
const CLUSTERS_WIDE = 10;
const MOBILE_MAX_WIDTH = 768;
const WIDE_MIN_WIDTH = 1536;

/** Cluster geometry, in canvas-relative units. The span is HALF of the 6× build
 *  (0.42 → 0.21, ~300px per graph on a 1440 viewport, by request), with drift
 *  and cursor push halved alongside so the motion keeps its proportion. */
const SIDE_MIN = 0.35; // soft bias away from the centre column
const SIDE_MAX = 0.95;
const CLUSTER_SPREAD = 0.21;

const FILL_X = 0.78;
const FILL_Y = 0.85;
/** Elliptical vignette span in half-axis units (>1 → clusters reach the edges). */
const VIGNETTE_SPAN = 1.3;

/** Soft elliptical dip under the copy: dots stay dim where the text lives.
 *  Widened with the bigger graphs so the headline keeps breathing. */
const DIP_X_FRACTION = 0.36;
const DIP_X_MAX = 560;
const DIP_Y_FRACTION = 0.44;
const DIP_Y_MAX = 320;
const DIP_FLOOR = 0.15;

const CURSOR_RADIUS = 240; // px — radius of the reactive field
const CURSOR_PUSH = 24; // px — max outward drift at the field centre (halved with the span)
const FOLLOW = 0.05; // pointer easing factor (smooth, never snappy)
const MAX_DPR = 1.5;
const TWINKLE_SPEED = 0.0009; // radians per ms
const DRIFT_SPEED_MIN = 0.00028; // ~22s per loop
const DRIFT_SPEED_MAX = 0.00052; // ~12s per loop
const ORBIT_MIN = 18; // px of cluster drift (halved with the span)
const ORBIT_MAX = 42;
const EDGE_BUCKETS = 8;
const EDGE_MAX_ALPHA = 0.3;
const NODE_ALPHA_STEPS = 7;
/** Luminous vertex = tiny core + a soft, wide halo (two arcs, same cost as one). */
const HALO_SCALE = 2.6;
const HALO_ALPHA = 0.18;
/** Small points can be crisp: only the huge discs needed a ceiling. */
const CORE_ALPHA_CEILING = 0.9;

/** Precomputed fill strings per kind → no per-frame colour allocation. */
function buildFills(rgb: string, maxAlpha: number): string[] {
  return Array.from(
    { length: NODE_ALPHA_STEPS },
    (_, index) => `rgba(${rgb}, ${(((index + 0.5) / NODE_ALPHA_STEPS) * maxAlpha).toFixed(3)})`,
  );
}

const NODE_FILLS: Record<NodeKind, string[]> = {
  dust: buildFills(DUST_RGB, 0.85),
  brand: buildFills(BRAND_RGB, 0.95),
  ember: buildFills(EMBER_RGB, 1),
};

/** Solid colours for the halo pass (its opacity comes from `globalAlpha`). */
const HALO_FILLS: Record<NodeKind, string> = {
  dust: `rgb(${DUST_RGB})`,
  brand: `rgb(${BRAND_RGB})`,
  ember: `rgb(${EMBER_RGB})`,
};

function createClusters(count: number): Cluster[] {
  const clusters: Cluster[] = [];
  const slots = Math.ceil(count / 2);

  for (let index = 0; index < count; index += 1) {
    const layer = index % LAYERS.length;
    const side = index % 2 === 0 ? -1 : 1;
    const slot = Math.floor(index / 2);
    const baseY = slots === 1 ? 0 : -0.95 + (1.9 * (slot + 0.5)) / slots;
    const nodeCount = 4 + (index % 2);

    const nodes: Node[] = Array.from({ length: nodeCount }, (_, nodeIndex) => {
      const roll = Math.random();
      const kind: NodeKind = roll < 0.04 ? "ember" : roll < 0.22 ? "brand" : "dust";
      const angle = (nodeIndex / Math.max(1, nodeCount - 1)) * Math.PI * 2 + Math.random() * 0.7;
      const distance = nodeIndex === 0 ? 0 : CLUSTER_SPREAD * (0.55 + Math.random() * 0.65);
      return {
        offsetX: Math.cos(angle) * distance,
        offsetY: Math.sin(angle) * distance,
        kind,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Small local graph: hub → every dot, plus a couple of chords (no global O(n²)).
    const links: Array<[number, number]> = [];
    for (let nodeIndex = 1; nodeIndex < nodeCount; nodeIndex += 1) links.push([0, nodeIndex]);
    if (nodeCount >= 4) links.push([1, 3]);
    if (nodeCount >= 5) links.push([2, 4]);

    clusters.push({
      baseX: side * (SIDE_MIN + Math.random() * (SIDE_MAX - SIDE_MIN)),
      baseY: baseY + (Math.random() - 0.5) * 0.12,
      layer,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: DRIFT_SPEED_MIN + Math.random() * (DRIFT_SPEED_MAX - DRIFT_SPEED_MIN),
      orbit: ORBIT_MIN + Math.random() * (ORBIT_MAX - ORBIT_MIN),
      nodes,
      links,
    });
  }

  return clusters;
}

export default function HeroGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // The hero <section> is the pointer surface: the canvas itself is
    // pointer-events-none, so the text/CTA above it stay fully clickable.
    const surface = canvas.parentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let clusters: Cluster[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let lastTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorStrength = 0;
    let cursorTarget = 0;

    // Reused per-cluster buffers (cleared each pass) + edge alpha buckets.
    const buffer = {
      x: [] as number[],
      y: [] as number[],
      radial: [] as number[],
      dip: [] as number[],
      boost: [] as number[],
      twinkle: [] as number[],
      radius: [] as number[],
      kind: [] as NodeKind[],
    };
    const edgeBuckets: number[][] = Array.from({ length: EDGE_BUCKETS }, () => []);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      clusters = createClusters(
        width >= WIDE_MIN_WIDTH
          ? CLUSTERS_WIDE
          : width < MOBILE_MAX_WIDTH
            ? CLUSTERS_MOBILE
            : CLUSTERS_DESKTOP,
      );
      if (!running) draw(0, 16.67);
    };

    /** Paint one frame. Pure math — no state writes beyond the eased pointer. */
    const draw = (time: number, delta: number) => {
      context.clearRect(0, 0, width, height);
      const halfX = width / 2;
      const halfY = height / 2;
      const centerX = halfX;
      const centerY = halfY;
      const dipX = Math.min(width * DIP_X_FRACTION, DIP_X_MAX);
      const dipY = Math.min(height * DIP_Y_FRACTION, DIP_Y_MAX);
      const ease = Math.min(1, FOLLOW * (delta / 16.67));

      tiltX += (pointerX - tiltX) * ease;
      tiltY += (pointerY - tiltY) * ease;
      cursorStrength += (cursorTarget - cursorStrength) * ease;

      for (const bucket of edgeBuckets) bucket.length = 0;

      for (const cluster of clusters) {
        const layer = LAYERS[cluster.layer % LAYERS.length]!;
        const driftAngle = time * cluster.driftSpeed + cluster.driftPhase;
        const clusterX =
          centerX +
          cluster.baseX * halfX * FILL_X +
          Math.cos(driftAngle) * cluster.orbit +
          tiltX * layer.parallax;
        const clusterY =
          centerY +
          cluster.baseY * halfY * FILL_Y +
          Math.sin(driftAngle * 0.8) * cluster.orbit * 0.6 +
          tiltY * layer.parallax * 0.6;
        const spreadX = halfX * CLUSTER_SPREAD;
        const spreadY = halfY * CLUSTER_SPREAD;

        buffer.x.length = 0;
        buffer.y.length = 0;
        buffer.radial.length = 0;
        buffer.dip.length = 0;
        buffer.boost.length = 0;
        buffer.twinkle.length = 0;
        buffer.radius.length = 0;
        buffer.kind.length = 0;

        for (const node of cluster.nodes) {
          let x = clusterX + node.offsetX * spreadX;
          let y = clusterY + node.offsetY * spreadY;

          // Elliptical vignette (follows the canvas, not a centred circle).
          const vx = (x - centerX) / (VIGNETTE_SPAN * halfX);
          const vy = (y - centerY) / (VIGNETTE_SPAN * halfY);
          const radial = Math.max(0, 1 - (vx * vx + vy * vy));

          // Text-protection dip: dim where the headline lives.
          const dipDistance = Math.min(1, Math.hypot((x - centerX) / dipX, (y - centerY) / dipY));
          const dip =
            DIP_FLOOR + (1 - DIP_FLOOR) * (dipDistance * dipDistance * (3 - 2 * dipDistance));

          // Cursor field: dots near the pointer drift outward and brighten.
          let boost = 0;
          if (cursorStrength > 0.01) {
            const dx = x - cursorX;
            const dy = y - cursorY;
            const distance = Math.hypot(dx, dy);
            if (distance < CURSOR_RADIUS) {
              const falloff = 1 - distance / CURSOR_RADIUS;
              const push = falloff * falloff * CURSOR_PUSH * cursorStrength;
              const normal = distance === 0 ? 0 : 1 / distance;
              x += dx * normal * push;
              y += dy * normal * push;
              boost = falloff * falloff * cursorStrength;
            }
          }

          buffer.x.push(x);
          buffer.y.push(y);
          buffer.radial.push(radial);
          buffer.dip.push(dip);
          buffer.boost.push(boost);
          buffer.twinkle.push(0.55 + 0.45 * Math.sin(time * TWINKLE_SPEED + node.phase));
          buffer.radius.push(layer.radius);
          buffer.kind.push(node.kind);
        }

        // Cluster edges, batched by alpha bucket.
        for (const [from, to] of cluster.links) {
          const ax = buffer.x[from];
          const ay = buffer.y[from];
          const bx = buffer.x[to];
          const by = buffer.y[to];
          const dipFrom = buffer.dip[from];
          const dipTo = buffer.dip[to];
          const twinkleFrom = buffer.twinkle[from];
          const twinkleTo = buffer.twinkle[to];
          if (
            ax === undefined ||
            ay === undefined ||
            bx === undefined ||
            by === undefined ||
            dipFrom === undefined ||
            dipTo === undefined ||
            twinkleFrom === undefined ||
            twinkleTo === undefined
          ) {
            continue;
          }
          const alpha =
            dipFrom * dipTo * (0.45 + 0.55 * Math.min(twinkleFrom, twinkleTo)) * EDGE_MAX_ALPHA;
          if (alpha <= 0.004) continue;
          const index = Math.min(
            EDGE_BUCKETS - 1,
            Math.floor((alpha / EDGE_MAX_ALPHA) * EDGE_BUCKETS),
          );
          edgeBuckets[index]?.push(ax, ay, bx, by);
        }

        // Orbs: luminous core plus a wide, faint halo (two arcs per dot).
        for (let index = 0; index < buffer.x.length; index += 1) {
          const alpha = Math.min(
            CORE_ALPHA_CEILING,
            layer.alpha * (buffer.radial[index] ?? 0) * (buffer.dip[index] ?? 0) * (buffer.twinkle[index] ?? 0) +
              (buffer.boost[index] ?? 0) * 0.5,
          );
          if (alpha <= 0.03) continue;
          const x = buffer.x[index] ?? 0;
          const y = buffer.y[index] ?? 0;
          const core = (buffer.radius[index] ?? 10) + (buffer.boost[index] ?? 0) * 0.6;
          const kind = buffer.kind[index] ?? "dust";

          // Halo first: soft luminous edge instead of a hard disc.
          context.fillStyle = HALO_FILLS[kind];
          context.globalAlpha = HALO_ALPHA;
          context.beginPath();
          context.arc(x, y, core * HALO_SCALE, 0, Math.PI * 2);
          context.fill();

          const fills = NODE_FILLS[kind];
          const step = Math.min(NODE_ALPHA_STEPS - 1, Math.floor(alpha * NODE_ALPHA_STEPS));
          context.globalAlpha = 1;
          context.fillStyle = fills[step] ?? fills[0]!;
          context.beginPath();
          context.arc(x, y, core, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.strokeStyle = `rgb(${BRAND_RGB})`;
      context.lineWidth = 1.5;
      for (let index = 0; index < edgeBuckets.length; index += 1) {
        const bucket = edgeBuckets[index];
        if (!bucket || bucket.length === 0) continue;
        context.globalAlpha = ((index + 0.5) / EDGE_BUCKETS) * EDGE_MAX_ALPHA;
        context.beginPath();
        for (let step = 0; step < bucket.length; step += 4) {
          context.moveTo(bucket[step]!, bucket[step + 1]!);
          context.lineTo(bucket[step + 2]!, bucket[step + 3]!);
        }
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const tick = (time: number) => {
      const delta = lastTime === 0 ? 16.67 : Math.min(time - lastTime, 48);
      lastTime = time;
      draw(time, delta);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || motionQuery.matches || !visible) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      cursorX = localX;
      cursorY = localY;
      cursorTarget = 1;
      pointerX = Math.max(-1, Math.min(1, (localX / rect.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (localY / rect.height) * 2 - 1));
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      cursorTarget = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    if (surface) observer.observe(surface);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Reduced motion: static frame only — no loop, no pointer tracking.
    if (motionQuery.matches) {
      draw(0, 16.67);
    } else {
      if (surface) {
        surface.addEventListener("pointermove", onPointerMove, { passive: true });
        surface.addEventListener("pointerleave", onPointerLeave);
      }
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      if (surface) {
        surface.removeEventListener("pointermove", onPointerMove);
        surface.removeEventListener("pointerleave", onPointerLeave);
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
