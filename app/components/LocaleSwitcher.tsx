import { getLocale, getMessages } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleSwitcherTone = "surface" | "panel";

interface LocaleSwitcherProps {
  /** `surface` follows the adaptive header polarity (dark/light); `panel`
   *  matches the light mobile-menu surface (`bg-paper`). */
  tone?: LocaleSwitcherTone;
}

const TONE_CLASSES: Record<LocaleSwitcherTone, string> = {
  surface: "text-paper focus-visible:outline-brand",
  panel: "text-ink hover:bg-mist focus-visible:outline-ink",
};

/**
 * Language selector (spec 12-i18n, I5) — real links, zero JavaScript: each
 * entry points at the same landing in its locale. Passing `locale` to the
 * locale-aware `Link` forces the prefix, so the anchor resolves to `/es` or
 * `/en`; next-intl's middleware canonicalises the default-locale `/es` to `/`
 * (as-needed, I1) and the emitted `hrefLang`/`lang` describe the target for
 * crawlers and screen readers. The active locale is marked with `aria-current`.
 * No `onClick`, no state.
 */
export default async function LocaleSwitcher({
  tone = "surface",
}: LocaleSwitcherProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <nav aria-label={messages.a11y.languageLabel}>
      <ul className="flex items-center gap-1">
        {routing.locales.map((option) => {
          const isActive = option === locale;
          return (
            <li key={option}>
              <Link
                href="/"
                locale={option}
                hrefLang={option}
                lang={option}
                aria-current={isActive ? "page" : undefined}
                className={`header-locale-link inline-flex min-h-10 min-w-9 items-center justify-center rounded-none px-2 text-small font-semibold uppercase whitespace-nowrap transition-colors duration-200 underline-offset-4 hover:underline hover:decoration-brand hover:decoration-2 focus-visible:outline-3 focus-visible:outline-offset-2 ${TONE_CLASSES[tone]}`}
              >
                {option.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
