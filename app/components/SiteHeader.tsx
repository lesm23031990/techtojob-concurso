import Image from "next/image";
import Link from "next/link";
import { messages, navItems } from "@/content";
import DiscordCta from "@/components/DiscordCta";
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

const desktopNavItems = navItems.filter((item) =>
  DESKTOP_NAV_HREFS.includes(item.href),
);

const mobileNavItems = navItems.filter((item) => item.href !== "#inicio");

/**
 * Sticky site header (design-system §6.6). The mobile menu is a styled
 * <details> element: operable with Enter/Space natively and zero client JS —
 * the only "use client" on this page is the newsletter form.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link
          href="#inicio"
          aria-label={messages.a11y.logoLabel}
          className="flex min-h-11 items-center rounded-full focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
        >
          {/* v1 horizontal on ≥768px, Símbolo on mobile (design-system §2 a/a') */}
          <Image
            src="/brand/logo-horizontal.svg"
            alt=""
            width={190}
            height={28}
            priority
            className="hidden h-7 w-auto md:block"
          />
          <Image
            src="/brand/logo-symbol.svg"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 md:hidden"
          />
        </Link>

        <nav aria-label={messages.a11y.navLabel} className="hidden md:block">
          <ul className="flex items-center">
            {desktopNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-body font-semibold text-ink underline-offset-4 hover:underline hover:decoration-brand hover:decoration-2 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <DiscordCta size="nav" label={messages.discord.ctaShort} />
        </div>

        {/* Mobile: <details> menu — 44px trigger, full-width panel, 48px rows */}
        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
            <IconMenu className="h-6 w-6 open:hidden" />
            <IconClose className="hidden h-6 w-6 open:block" />
            <span className="sr-only group-open:hidden">{messages.a11y.menuOpen}</span>
            <span className="sr-only hidden group-open:inline">{messages.a11y.menuClose}</span>
          </summary>
          <nav
            aria-label={messages.a11y.mobileNavLabel}
            className="absolute right-0 top-full z-50 mt-2 w-screen max-w-[calc(100vw-2.5rem)] rounded-card border border-line bg-paper p-3 shadow-raised"
          >
            <ul>
              {mobileNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-full px-4 text-body font-semibold text-ink hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-line pt-3">
              <DiscordCta size="block" className="w-full" label={messages.discord.cta} />
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
