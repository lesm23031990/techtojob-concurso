/**
 * Hand-drawn inline icons (geometry follows the ISC-licensed Lucide icon set —
 * declared in the README per contest rule R9). No icon library dependency:
 * only a handful of glyphs are needed site-wide. All are decorative
 * (`aria-hidden`) and always accompanied by visible text.
 */
import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

function SvgBase({
  className = "h-5 w-5",
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </SvgBase>
  );
}

/** Down arrow for an in-page jump to a section below (`#unete`, D76). */
export function IconArrowDown(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </SvgBase>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </SvgBase>
  );
}

export function IconClose(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgBase>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </SvgBase>
  );
}

/** Code glyph for the developer audience block (Lucide `code`). Decorative. */
export function IconCode(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </SvgBase>
  );
}

/** Building glyph for the company audience block (Lucide `building-2`).
 *  Decorative. */
export function IconBuilding(props: IconProps) {
  return (
    <SvgBase {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </SvgBase>
  );
}
