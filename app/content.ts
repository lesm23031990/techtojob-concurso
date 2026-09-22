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
  mobileNavLabel: string;
  menuOpen: string;
  menuClose: string;
  newTabHint: string;
  logoLabel: string;
}

export interface NavLinks {
  inicio: string;
  comoFunciona: string;
  talento: string;
  empresas: string;
  torneos: string;
  networking: string;
  testimonios: string;
  noticias: string;
  newsletter: string;
  unete: string;
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
  apoyo: string;
}

export interface Step {
  titulo: string;
  texto: string;
}

export interface ComoFunciona {
  h2: string;
  intro: string;
  pasos: Step[];
  cierre: string;
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
  nombre: string;
  rol: string;
  frase: string;
}

export interface Testimonios {
  h2: string;
  sub: string;
  items: Testimonial[];
  linkedinSlotTitle: string;
  linkedinSlotHint: string;
}

export interface NewsItem {
  categoria: string;
  fecha: string;
  fechaIso: string;
  titulo: string;
  resumen: string;
  cta: string;
}

export interface Noticias {
  h2: string;
  maquetaNota: string;
  items: NewsItem[];
}

export interface Newsletter {
  h2: string;
  copy: string;
  label: string;
  placeholder: string;
  boton: string;
  nota: string;
  exito: string;
}

export interface FooterLink {
  texto: string;
  href: string;
}

export interface FooterBlock {
  titulo: string;
  enlaces: FooterLink[];
}

export interface SocialLink {
  texto: string;
  href: string;
}

export interface Footer {
  bloques: {
    talento: FooterBlock;
    empresas: FooterBlock;
    comunidad: FooterBlock;
    legal: FooterBlock;
  };
  redes: {
    titulo: string;
    linkedin: SocialLink;
    x: SocialLink;
    instagram: SocialLink;
  };
  creditos: string;
  legalNota: string;
}

export interface Messages {
  meta: Meta;
  a11y: A11y;
  nav: { links: NavLinks };
  discord: Discord;
  hero: Hero;
  comoFunciona: ComoFunciona;
  talento: AudienceSection;
  empresas: AudienceSection;
  torneos: SimpleSection;
  networking: SimpleSection;
  testimonios: Testimonios;
  noticias: Noticias;
  newsletter: Newsletter;
  cierre: SimpleSection & { cta: string };
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
  { href: "#inicio", label: messages.nav.links.inicio },
  { href: "#como-funciona", label: messages.nav.links.comoFunciona },
  { href: "#talento", label: messages.nav.links.talento },
  { href: "#empresas", label: messages.nav.links.empresas },
  { href: "#torneos", label: messages.nav.links.torneos },
  { href: "#networking", label: messages.nav.links.networking },
  { href: "#testimonios", label: messages.nav.links.testimonios },
  { href: "#noticias", label: messages.nav.links.noticias },
  { href: "#newsletter", label: messages.nav.links.newsletter },
  { href: "#unete", label: messages.nav.links.unete },
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
      messages.footer.redes.linkedin.href,
      messages.footer.redes.x.href,
      messages.footer.redes.instagram.href,
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
