import Image from "next/image";
import type { ReactNode } from "react";

/**
 * HeroTiles — the "Cosmos wall" translated to TechToJob (D34).
 *
 * Decorative floating tiles scattered around the edges of the hero, tilted at
 * subtle angles in three depth layers, echoing the reference's scattered
 * "polaroid" composition WITHOUT photographs:
 * - no external images → no LCP cost, no alt text needed (R53/R56/R57),
 * - every fill comes from the fixed palette (R24): brand / coal / paper tints.
 *
 * Rules honoured by construction:
 * - purely decorative → the whole wall is `aria-hidden` + `pointer-events-none`
 *   and sits BELOW the content layer (`z-0` vs the copy's `z-10`);
 * - tiles never enter the centre copy column at any breakpoint: wide positions
 *   appear from `xl`, mid-edge ones from `lg`/`md`, and below `md` only two
 *   small ghosts sit in the bottom corners (the mobile copy is full width);
 * - motion is a slow transform-only drift (≥14s loops, staggered delays) →
 *   no layout work, CLS 0, and the global `prefers-reduced-motion` guard in
 *   globals.css freezes every tile in place (R34 "que no estorben").
 *
 * Tailwind v4 note: `rotate-*` utilities animate the standalone `rotate`
 * property, so the `tile-drift` keyframes (which animate `transform:
 * translate(...)`) never fight the static tilt.
 */

type TileKind = "ghost" | "glass" | "brand" | "coal";
type Glyph = "code" | "chat" | "trophy" | "briefcase" | "users";

interface Tile {
  /** Tailwind classes: size + position + static tilt + visibility breakpoint. */
  pos: string;
  /** Drift timing (duration/delay utilities, staggered by hand). */
  timing: string;
  kind: TileKind;
  glyph?: Glyph;
}

/* Lucide geometry (same source declared in the README, R9), drawn inline. */
const GLYPHS: Record<Glyph, ReactNode> = {
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

const TILES: Tile[] = [
  /* ── Always visible: two small ghosts in the bottom corners (safe on mobile) ── */
  {
    kind: "ghost",
    pos: "w-16 h-20 rounded-2xl -rotate-9 bottom-[6%] left-[2%]",
    timing: "[animation-duration:26s] [animation-delay:-4s]",
  },
  {
    kind: "ghost",
    pos: "w-14 h-14 rounded-xl rotate-12 bottom-[9%] right-[3%]",
    timing: "[animation-duration:30s] [animation-delay:-14s]",
  },

  /* ── md+ (768px): the side margins start to exist ── */
  {
    kind: "brand",
    pos: "md:block hidden w-20 h-24 rounded-2xl -rotate-12 top-[14%] left-[3%]",
    timing: "[animation-duration:16s] [animation-delay:-2s]",
  },
  {
    kind: "glass",
    glyph: "code",
    pos: "md:block hidden w-16 h-20 rounded-xl rotate-6 top-[42%] left-[10%]",
    timing: "[animation-duration:19s] [animation-delay:-8s]",
  },
  {
    kind: "ghost",
    pos: "md:block hidden w-24 h-24 rounded-3xl -rotate-6 top-[8%] right-[6%]",
    timing: "[animation-duration:28s] [animation-delay:-18s]",
  },

  /* ── lg+ (1024px): full edge wall ── */
  {
    kind: "coal",
    pos: "lg:block hidden w-20 h-24 rounded-2xl rotate-9 bottom-[18%] left-[6%]",
    timing: "[animation-duration:17s] [animation-delay:-6s]",
  },
  {
    kind: "brand",
    pos: "lg:block hidden w-16 h-20 rounded-xl rotate-6 top-[48%] right-[3%]",
    timing: "[animation-duration:15s] [animation-delay:-11s]",
  },
  {
    kind: "glass",
    glyph: "briefcase",
    pos: "lg:block hidden w-20 h-20 rounded-2xl -rotate-9 top-[26%] right-[10%]",
    timing: "[animation-duration:21s] [animation-delay:-3s]",
  },
  {
    kind: "ghost",
    pos: "lg:block hidden w-16 h-20 rounded-2xl rotate-3 top-[68%] right-[14%]",
    timing: "[animation-duration:24s] [animation-delay:-9s]",
  },

  /* ── xl+ (1280px): the wide positions, closer to the copy column edge ── */
  {
    kind: "glass",
    glyph: "chat",
    pos: "xl:block hidden w-24 h-24 rounded-2xl rotate-12 bottom-[26%] right-[20%]",
    timing: "[animation-duration:20s] [animation-delay:-13s]",
  },
  {
    kind: "glass",
    glyph: "trophy",
    pos: "xl:block hidden w-16 h-20 rounded-xl -rotate-3 top-[10%] left-[22%]",
    timing: "[animation-duration:18s] [animation-delay:-16s]",
  },
  {
    kind: "glass",
    glyph: "users",
    pos: "xl:block hidden w-20 h-24 rounded-2xl -rotate-12 bottom-[10%] left-[20%]",
    timing: "[animation-duration:22s] [animation-delay:-5s]",
  },
  {
    kind: "coal",
    pos: "xl:block hidden w-14 h-14 rounded-xl rotate-9 top-[58%] left-[4%]",
    timing: "[animation-duration:16s] [animation-delay:-10s]",
  },
];

function TileBody({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "ghost":
      // Depth layer: barely-there tinted shapes, blurred → atmosphere.
      return <span aria-hidden="true" className="block h-full w-full rounded-[inherit] bg-brand/10 blur-[3px]" />;
    case "glass":
      // Mid layer: hairline cards carrying a pillar icon of the community.
      return (
        <span
          aria-hidden="true"
          className="grid h-full w-full place-items-center rounded-[inherit] border border-white/10 bg-white/[0.04] text-cloud/70"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {tile.glyph ? GLYPHS[tile.glyph] : null}
          </svg>
        </span>
      );
    case "brand":
      // Front layer: official symbol (carbon `Positivo` reads 6.77:1 on brand).
      return (
        <span aria-hidden="true" className="grid h-full w-full place-items-center rounded-[inherit] bg-brand">
          <Image
            src="/brand/logo-symbol.svg"
            alt=""
            width={32}
            height={32}
            loading="eager"
            className="h-8 w-8"
          />
        </span>
      );
    case "coal":
      // Front layer: raised dark card, green `Negativo` symbol (6.17:1).
      return (
        <span
          aria-hidden="true"
          className="grid h-full w-full place-items-center rounded-[inherit] border border-white/10 bg-coal"
        >
          <Image
            src="/brand/logo-symbol-light.svg"
            alt=""
            width={32}
            height={32}
            loading="eager"
            className="h-8 w-8"
          />
        </span>
      );
  }
}

export default function HeroTiles() {
  return (
    <div
      aria-hidden="true"
      /* D35: the wall is dimmed to 60% — "Recruit en tinta" wants a flat dark
         stage where the headline carries the screen; the tiles stay as
         subliminal depth, never as protagonists. */
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60"
    >
      {TILES.map((tile, i) => (
        <span
          key={i}
          className={`animate-tile-drift absolute ${tile.pos} ${tile.timing}`}
        >
          <TileBody tile={tile} />
        </span>
      ))}
    </div>
  );
}
