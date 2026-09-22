/**
 * Typed access to `messages/es.json` (contest rule R36: all visible text lives
 * in one file, zero strings embedded in components).
 *
 * The `Messages` interfaces below mirror `specs/11-contenido.md` §"Estructura
 * messages/es.json". The plain assignment `messages: Messages = raw` makes any
 * missing or renamed key a compile-time error — no `as` casts, no runtime cost.
 */
import raw from "@/messages/es.json";

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

export interface Hero {
  h1: string;
  sub: string;
  cta: string;
  support: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface HowItWorks {
  h2: string;
  intro: string;
  steps: Step[];
  closing: string;
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
  closing: SimpleSection & { cta: string };
  footer: Footer;
}

export const messages: Messages = raw;

/** Single source of truth for site-level data (URL is a deploy placeholder, Q4). */
export const site = {
  name: "TechToJob",
  url: "https://techtojob.vercel.app",
  locale: "es",
} as const;

/** Anchor targets mirror specs/10-landing-spec.md (R45: readable anchors). */
export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "#inicio", label: messages.nav.links.home },
  { href: "#como-funciona", label: messages.nav.links.howItWorks },
  { href: "#talento", label: messages.nav.links.talent },
  { href: "#empresas", label: messages.nav.links.companies },
  { href: "#torneos", label: messages.nav.links.tournaments },
  { href: "#networking", label: messages.nav.links.networking },
  { href: "#testimonios", label: messages.nav.links.testimonials },
  { href: "#noticias", label: messages.nav.links.news },
  { href: "#newsletter", label: messages.nav.links.newsletter },
  { href: "#unete", label: messages.nav.links.join },
];

/** Build the Organization JSON-LD object (contest rule R52). */
export function organizationJsonLd(baseUrl: string) {
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
