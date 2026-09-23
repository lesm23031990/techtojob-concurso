import Image from "next/image";
import Link from "next/link";
import { getMessages } from "next-intl/server";
import { navItemsFor } from "@/content";
import DiscordCta from "@/components/DiscordCta";
import HeaderSurface from "@/components/HeaderSurface";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { IconClose, IconMenu } from "@/components/icons";

/** Anchors shown in the desktop bar (the full set lives in the mobile panel;
 *  "Inicio" is the logo itself, so it never needs a text link). */
const DESKTOP_NAV_HREFS = [
  "#como-funciona",
  "#talento",
  "#empresas",
  "#torneos",
  "#networking",
  "#noticias",
];

/** Anchors that only fit from 1280px up. Adding the locale selector to the
 *  right cluster costs ~100px, so at 1024–1279 the bar keeps four anchors;
 *  dropping one from the bar is cheaper than letting the row overflow and the
 *  footer/mobile panel still link it (same trade-off D34/D45 already made). */
const DESKTOP_NAV_HREFS_XL = ["#networking"];

/** Shown only from 1536px: the widest anchor returns when there is room. */
const DESKTOP_NAV_HREFS_2XL = ["#noticias"];

type DesktopNavTier = "base" | "xl" | "2xl";

const TIER_CLASSES: Record<DesktopNavTier, string | undefined> = {
  base: undefined,
  xl: "hidden xl:block",
  "2xl": "hidden 2xl:block",
};

function desktopTier(href: string): DesktopNavTier {
  if (DESKTOP_NAV_HREFS_2XL.includes(href)) return "2xl";
  if (DESKTOP_NAV_HREFS_XL.includes(href)) return "xl";
  return "base";
}

/**
 * Sticky site header (design-system §6.6, adaptive per D47). The bar adopts the
 * polarity of the section behind it: a SOLID 80px veil crossfades between
 * `ink` and `paper`, and a separate gradient strip below the bar dissolves its
 * bottom edge into the section behind it. Text/logo/CTA swap via
 * `[data-header-surface]` on <html>, which the tiny `HeaderSurface` island
 * publishes. Because the veil is fully opaque, the logo, links and CTA never
 * sit over a translucent edge; the default state is dark, so the server render
 * is already correct (CLS 0) and without JS the bar simply stays ink.
 *
 * The dark logo is a composite built from OFFICIAL assets: the green `Negativo`
 * symbol (§0.1: on ink the green mark reads 6.17:1) inside a square tile, plus
 * a derived two-tone wordmark (same official outlines; "Tech" in paper,
 * "ToJob" in brand). On light surfaces it swaps to the official charcoal
 * horizontal lockup (6.75:1 on paper). No official file was altered and the
 * accessible name comes from the link's aria-label, not from the images.
 *
 * Height 5rem, kept in sync with the hero (`-mt-20` pulls it up behind this
 * bar and `pt-20`/`min-h-svh` on its content block) and with
 * `scroll-padding-top` in globals.css. The bar slides in on load
 * (`animate-header-in`, CSS only, transform/opacity → CLS 0) as the first beat
 * of the page cascade: header → H1 → sub → CTA → support.
 * The mobile menu is a styled <details> element: operable with Enter/Space
 * natively and zero client JS.
 *
 * The locale selector joins the right cluster, before the CTA, from 640px up
 * (i18n I5); below that it lives in the menu panel. Because the row is tight,
 * the two widest anchors tier up (`#networking` from xl, `#noticias` from 2xl)
 * so the bar never overflows or eats the CTA's gutter (D53) — the footer and
 * the mobile panel still link every section.
 */
export default async function SiteHeader() {
  const messages = await getMessages();
  const navItems = navItemsFor(messages);
  const desktopNavItems = navItems
    .filter((item) => DESKTOP_NAV_HREFS.includes(item.href))
    .map((item) => ({ ...item, tier: desktopTier(item.href) }));
  const mobileNavItems = navItems.filter((item) => item.href !== "#inicio");

  return (
    <header id="site-header" className="animate-header-in sticky top-0 z-50">
      <HeaderSurface />
      <div aria-hidden="true" className="header-veil-layer header-veil-dark" />
      <div aria-hidden="true" className="header-veil-layer header-veil-light" />
      <div aria-hidden="true" className="header-fade-layer header-fade-dark" />
      <div aria-hidden="true" className="header-fade-layer header-fade-light" />
      <div className="relative flex h-20 items-center justify-between gap-2 px-5 md:gap-6 md:px-8 lg:gap-3 lg:px-10 xl:gap-6">
        <Link
          href="#inicio"
          aria-label={messages.a11y.logoLabel}
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          {/* TODO(D55): sustituir el lockup light por el composite tipo tile+wordmark, pendiente del criterio de design-ux */}
          {/* Dark-surface lockup: composite built from OFFICIAL assets (D31) —
              green `Negativo` symbol (§0.1: 6.17:1 on ink) in a square tile
              plus the two-tone wordmark. Swapped for the official charcoal
              lockup when the adaptive header sits on a light surface (D47). */}
          <span className="header-logo header-logo-dark flex items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-none border border-brand/40 bg-white/5">
              <Image
                src="/brand/logo-symbol-light.svg"
                alt=""
                width={24}
                height={24}
                priority
                className="h-6 w-6"
              />
            </span>
            <Image
              src="/brand/wordmark-duo.svg"
              alt=""
              width={178}
              height={24}
              priority
              className="h-5 w-auto sm:h-6"
            />
          </span>
          {/* Official charcoal horizontal lockup: 6.75:1 on paper (D47). */}
          <span className="header-logo header-logo-light items-center">
            <Image
              src="/brand/logo-horizontal.svg"
              alt=""
              width={162}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </span>
        </Link>

        {/* Desktop nav (D34/D45): a plain inline row of section links with no
            frame — no border, no background, no container padding. It is still
            a real list of anchors (no fake search field: this site has no
            backend). */}
        <nav aria-label={messages.a11y.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {desktopNavItems.map((item) => (
              <li key={item.href} className={TIER_CLASSES[item.tier]}>
                <Link
                  href={item.href}
                  className="header-nav-link inline-flex min-h-10 items-center rounded-none px-2 text-small font-semibold whitespace-nowrap text-paper underline-offset-4 hover:underline hover:decoration-brand hover:decoration-2 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand xl:px-3 xl:text-body"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language selector: real links, visible from 640px up (i18n I5).
            Below that it moves into the menu panel with the CTA row. */}
        <div className="hidden shrink-0 sm:block">
          <LocaleSwitcher />
        </div>

        {/* The conversion action stays in the bar from 640px up; below that it
            lives in the menu panel (there is no room for it at 360px). */}
        <div className="hidden shrink-0 sm:block">
          <DiscordCta size="nav" label={messages.discord.ctaShort} className="header-cta" />
        </div>

        {/* Menu: <details> — 44px trigger, full-width panel, 48px rows */}
        <details className="group relative lg:hidden">
          <summary className="header-icon flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-none text-paper hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            <IconMenu className="h-6 w-6 open:hidden" />
            <IconClose className="hidden h-6 w-6 open:block" />
            <span className="sr-only group-open:hidden">{messages.a11y.menuOpen}</span>
            <span className="sr-only hidden group-open:inline">{messages.a11y.menuClose}</span>
          </summary>
          <nav
            aria-label={messages.a11y.mobileNavLabel}
            className="absolute right-0 top-full z-50 mt-2 w-screen max-w-[calc(100vw-2.5rem)] rounded-none border border-line bg-paper p-3 shadow-raised"
          >
            {/* Below 640px the bar has no room for the selector (360px:
                logo + hamburger already fill the row), so it lives here. */}
            <div className="mb-2 flex justify-end border-b border-line pb-2 sm:hidden">
              <LocaleSwitcher tone="panel" />
            </div>
            <ul>
              {mobileNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="header-menu-link flex min-h-12 items-center rounded-none px-4 text-body font-semibold text-ink hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-line pt-3 sm:hidden">
              <DiscordCta size="block" label={messages.discord.cta} />
            </div>
          </nav>
        </details>
      </div>
      <span aria-hidden="true" className="header-progress" />
    </header>
  );
}
