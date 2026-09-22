/* eslint-disable @next/next/no-img-element -- this JSX is rendered by satori
   into a PNG at build time, never sent to a browser: <img> is the only image
   element ImageResponse understands (next/image would never resolve here). */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { messages } from "@/content";

/**
 * Open Graph card 1200×630 (contest rule R51), generated at build time —
 * no static PNG dead weight in the repo. Composition per
 * docs/design-system.md §2e: ink background, stacked light lockup on the
 * left, hero H1 in Sora 700 on the right with a green support line, and
 * the gradient symbol as a translucent texture in the bottom-right corner.
 *
 * Fonts are the three Sora static TTFs (same family/weights as the site)
 * and the SVGs are the same brand files served from /public — one source
 * of truth for the whole visual identity.
 */
export const alt = messages.meta.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Statically analyzable URLs via `new URL(..., import.meta.url)`: keeps the
// deploy trace scoped to exactly these five files (no process.cwd()).
// Uint8Array.from copies the Buffer into a fresh, exactly-sized ArrayBuffer.
async function loadFile(url: URL): Promise<ArrayBuffer> {
  const bytes = await readFile(url);
  return Uint8Array.from(bytes).buffer;
}

export default async function OpengraphImage() {
  const [font400, font600, font700, stackedSvg, symbolGradientSvg] =
    await Promise.all([
      loadFile(new URL("../fonts/sora-400.ttf", import.meta.url)),
      loadFile(new URL("../fonts/sora-600.ttf", import.meta.url)),
      loadFile(new URL("../fonts/sora-700.ttf", import.meta.url)),
      loadFile(new URL("../public/brand/logo-stacked-light.svg", import.meta.url)),
      loadFile(
        new URL("../public/brand/logo-symbol-gradient.svg", import.meta.url),
      ),
    ]);

  const svgDataUri = (buffer: ArrayBuffer) =>
    `data:image/svg+xml;base64,${Buffer.from(buffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2f3436",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative gradient symbol, bottom-right texture */}
        <img
          src={svgDataUri(symbolGradientSvg)}
          width={420}
          height={420}
          alt=""
          style={{
            position: "absolute",
            right: "-90px",
            bottom: "-110px",
            opacity: 0.14,
          }}
        />

        {/* brand lockup: v2 stacked light (green on ink, 6.17:1) */}
        <img
          src={svgDataUri(stackedSvg)}
          width={430}
          height={238}
          alt="TechToJob"
          style={{ display: "flex" }}
        />

        {/* message: the real hero H1, as text (R39) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 600,
            marginLeft: 56,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.2,
              color: "#ffffff",
            }}
          >
            {messages.meta.og.headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <div
              style={{
                width: 8,
                height: 40,
                backgroundColor: "#84c0bf",
                marginRight: 20,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 27,
                fontWeight: 400,
                lineHeight: 1.4,
                color: "#c3cdcd",
              }}
            >
              {messages.meta.og.support}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: font400, weight: 400, style: "normal" },
        { name: "Sora", data: font600, weight: 600, style: "normal" },
        { name: "Sora", data: font700, weight: 700, style: "normal" },
      ],
    },
  );
}
