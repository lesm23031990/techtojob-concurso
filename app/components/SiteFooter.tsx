import Image from "next/image";
import { messages } from "@/content";
import type { FooterBlock, SocialLink } from "@/content";
import { IconArrowUpRight } from "@/components/icons";

const blocks: FooterBlock[] = [
  messages.footer.bloques.talento,
  messages.footer.bloques.empresas,
  messages.footer.bloques.comunidad,
  messages.footer.bloques.legal,
];

const socialLinks: SocialLink[] = [
  messages.footer.redes.linkedin,
  messages.footer.redes.x,
  messages.footer.redes.instagram,
];

function isExternal(href: string): boolean {
  return href.startsWith("https://");
}

/**
 * Footer (section 11, R21) — continuous dark block after the closing
 * (design-system §7), separated by a hairline. Four link blocks, social
 * profiles with descriptive text (never "here", R44) and the honest legal
 * note (D19): legal links anchor to #legal-nota instead of faking 404s.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline-dark bg-ink text-cloud">
      <div className="page-container py-16">
        {/* decorative brand mark — the only one in the footer (§2c) */}
        <Image
          src="/brand/logo-horizontal-light.svg"
          alt=""
          aria-hidden="true"
          width={216}
          height={32}
          loading="lazy"
          className="h-8 w-auto"
        />

        <nav
          aria-label={messages.a11y.navLabel}
          className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {blocks.map((block) => (
            <div key={block.titulo}>
              <h2 className="text-small font-semibold uppercase tracking-label text-paper">
                {block.titulo}
              </h2>
              <ul className="mt-4 space-y-1">
                {block.enlaces.map((link) => (
                  <li key={link.texto}>
                    <a
                      href={link.href}
                      {...(isExternal(link.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-11 items-center gap-1 rounded-full text-body font-semibold text-cloud transition-colors duration-150 hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {link.texto}
                      {isExternal(link.href) && (
                        <>
                          <IconArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">{messages.a11y.newTabHint}</span>
                        </>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 border-t border-hairline-dark pt-8">
          <h2 className="text-small font-semibold uppercase tracking-label text-paper">
            {messages.footer.redes.titulo}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {socialLinks.map((social) => (
              <li key={social.texto}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full text-body font-semibold text-cloud transition-colors duration-150 hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {social.texto}
                  <IconArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">{messages.a11y.newTabHint}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-hairline-dark pt-8">
          <p className="text-small">{messages.footer.creditos}</p>
          <p id="legal-nota" className="mt-3 max-w-[65ch] scroll-mt-24 text-small text-cloud">
            {messages.footer.legalNota}
          </p>
        </div>
      </div>
    </footer>
  );
}
