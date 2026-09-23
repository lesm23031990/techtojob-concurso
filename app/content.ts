/**
 * Typed access to the message catalogs (contest rule R36 / i18n I6: all visible
 * text lives in `messages/*.json`, zero strings embedded in components).
 *
 * The `Messages` interfaces below mirror `specs/11-contenido.md` §"Estructura
 * messages/es.json". Typing BOTH catalogs against the same interface
 * (`messagesByLocale: Record<Locale, Messages>`) makes a missing or renamed key
 * in either file a compile-time error — no `as` casts, no runtime cost.
 */
import es from "@/messages/es.json";
import en from "@/messages/en.json";

export interface Meta {
  title: string;
  description: string;
  ogImageAlt: string;
  og: { headline: string; support: string };
}

export interface A11y {
  skipLink: string;
  mainLabel: string;
  navLabel: string;
  footerNavLabel: string;
  mobileNavLabel: string;
  menuOpen: string;
  menuClose: string;
  newTabHint: string;
  logoLabel: string;
  /** aria-label of the language selector nav (spec 12-i18n, I5). */
  languageLabel: string;
}

export interface NavLinks {
  home: string;
  howItWorks: string;
  talent: string;
  companies: string;
  tournaments: string;
  networking: string;
  testimonials: string;
  news: string;
  newsletter: string;
  join: string;
}

export interface Discord {
  url: string;
  cta: string;
  ctaShort: string;
}

export interface HeroMetaItem {
  label: string;
  value: string;
}

export interface Hero {
  /** Highlight phrase of `line2`, rendered in brand — must occur exactly once. */
  highlight: string;
  /** Headline, line 1 (muted `cloud`) — two-line split, still ONE <h1> (R40). */
  line1: string;
  /** Headline, line 2 (white + brand highlight phrase). */
  line2: string;
  sub: string;
  cta: string;
  support: string;
  /** Meta column entries (V5): factual label/value pairs, no invented figures. */
  meta: HeroMetaItem[];
  /** Ticker tokens (D38): derived only from already-published strings, kept
   *  decorative (aria-hidden) so the hero meta stays the single source. */
  ticker: string[];
}

export interface Step {
  title: string;
  text: string;
  /** "What you get" line shown under the description (D66). Paraphrase of
   *  already-approved copy — see specs/11; no invented facts (J2/R36). */
  result: string;
}

export interface HowItWorks {
  h2: string;
  intro: string;
  steps: Step[];
  closing: string;
  /** Descriptive text link to the Discord at the end of the journey (D66).
   *  A LINK, never a button (R11: the only buttons are the hero/closing CTA). */
  cta: string;
}

export interface AudienceSection {
  eyebrow: string;
  h2: string;
  copy: string;
}

export interface SimpleSection {
  h2: string;
  copy: string;
}

export interface Closing {
  /** Two-line headline (D35): line1 muted `cloud`, line2 `paper`. */
  line1: string;
  line2: string;
  copy: string;
  cta: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface Testimonials {
  h2: string;
  sub: string;
  items: Testimonial[];
  linkedinSlotTitle: string;
  linkedinSlotHint: string;
}

export interface NewsItem {
  category: string;
  date: string;
  dateIso: string;
  title: string;
  summary: string;
  cta: string;
}

export interface News {
  h2: string;
  mockNote: string;
  items: NewsItem[];
}

export interface Newsletter {
  h2: string;
  copy: string;
  label: string;
  placeholder: string;
  button: string;
  note: string;
  success: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterBlock {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  text: string;
  href: string;
}

export interface Footer {
  blocks: {
    talent: FooterBlock;
    companies: FooterBlock;
    community: FooterBlock;
    legal: FooterBlock;
  };
  social: {
    title: string;
    linkedin: SocialLink;
    x: SocialLink;
    instagram: SocialLink;
  };
  credits: string;
  legalNote: string;
}

export interface Messages {
  meta: Meta;
  a11y: A11y;
  nav: { links: NavLinks };
  discord: Discord;
  hero: Hero;
  howItWorks: HowItWorks;
  talent: AudienceSection;
  companies: AudienceSection;
  tournaments: SimpleSection;
  networking: SimpleSection;
  testimonials: Testimonials;
  news: News;
  newsletter: Newsletter;
  closing: Closing;
  footer: Footer;
}

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Locale → messages. Typing both against `Messages` makes a missing/renamed
 *  key in EITHER file a compile-time error (R36 / i18n). */
export const messagesByLocale: Record<Locale, Messages> = { es, en };

/** Single source of truth for site-level data (URL is a deploy placeholder, Q4). */
export const site = {
  name: "TechToJob",
  url: "https://techtojob.vercel.app",
  locale: "es",
} as const;

/** Anchor targets mirror specs/10-landing-spec.md (R45: readable anchors).
 *  Order = the page's narrative order (D32): the timeline reads
 *  explanation → proof → what you get → what companies get → community →
 *  validation → news → CTA. */
export interface NavItem {
  href: string;
  label: string;
}

export function navItemsFor(messages: Messages): NavItem[] {
  return [
    { href: "#inicio", label: messages.nav.links.home },
    { href: "#como-funciona", label: messages.nav.links.howItWorks },
    { href: "#torneos", label: messages.nav.links.tournaments },
    { href: "#talento", label: messages.nav.links.talent },
    { href: "#empresas", label: messages.nav.links.companies },
    { href: "#networking", label: messages.nav.links.networking },
    { href: "#testimonios", label: messages.nav.links.testimonials },
    { href: "#noticias", label: messages.nav.links.news },
    { href: "#newsletter", label: messages.nav.links.newsletter },
    { href: "#unete", label: messages.nav.links.join },
  ];
}

/**
 * Narrative order of the landing body (D32), excluding the hero — the door —
 * and the footer. R22 only fixes the hero first and the footer last, so this
 * order is ours and is declared in the README (R10).
 *
 * Single source of truth for the vertical timeline: the step numeral each
 * section shows on the rail, and the order documented in
 * specs/10-landing-spec.md and app/app/page.tsx.
 */
export const timelineOrder: readonly string[] = [
  "como-funciona",
  "torneos",
  "talento",
  "empresas",
  "networking",
  "testimonios",
  "noticias",
  "newsletter",
  "unete",
];

/** 1-based timeline position of a section id (undefined = no step numeral). */
export function timelineStep(id: string): number | undefined {
  const index = timelineOrder.indexOf(id);
  return index >= 0 ? index + 1 : undefined;
}

/** Build the Organization JSON-LD object (contest rule R52). Same profiles for
 *  both locales; the message catalog is passed in so the function stays pure. */
export function organizationJsonLd(baseUrl: string, messages: Messages) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/logo-horizontal.svg`,
    sameAs: [
      messages.footer.social.linkedin.href,
      messages.footer.social.x.href,
      messages.footer.social.instagram.href,
    ],
  };
}

/**
 * Deterministic initials for the testimonial avatar placeholder (no image yet —
 * the brief asks to reserve the slot, R17). Takes first letters of first and
 * last name parts.
 */
export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? "") : "";
  return (first + last).toUpperCase();
}
