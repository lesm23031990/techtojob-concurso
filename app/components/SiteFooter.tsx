import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { FooterBlock, SocialLink } from "@/content";
import { IconArrowUpRight } from "@/components/icons";

function isExternal(href: string): boolean {
  return href.startsWith("https://");
}

/**
 * Footer (section 11, R21) — continuous dark block after the closing
 * (design-system §7), separated by a hairline. Four link blocks, social
 * profiles with descriptive text (never "here", R44) and the honest legal
 * note (D19): legal links anchor to #legal-nota instead of faking 404s.
 */
export default async function SiteFooter() {
  const messages = await getMessages();

  const blocks: FooterBlock[] = [
    messages.footer.blocks.talent,
    messages.footer.blocks.companies,
    messages.footer.blocks.community,
    messages.footer.blocks.legal,
  ];

  const socialLinks: SocialLink[] = [
    messages.footer.social.linkedin,
    messages.footer.social.x,
    messages.footer.social.instagram,
  ];

  return (
    <footer className="border-t border-hairline-dark bg-ink text-paper">
      <div className="page-container py-8 sm:py-16">
        {/* decorative brand mark — the same header composite as the ink state (§2a/§2c, D58) */}
        <span aria-hidden="true" className="hidden items-center gap-2.5 sm:flex">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-none border border-brand/40 bg-white/5">
            <Image
              src="/brand/logo-symbol-light.svg"
              alt=""
              width={24}
              height={24}
              loading="lazy"
              className="h-6 w-6"
            />
          </span>
          <Image
            src="/brand/wordmark-duo.svg"
            alt=""
            width={178}
            height={24}
            loading="lazy"
            className="h-5 w-auto sm:h-6"
          />
        </span>

        <nav
          aria-label={messages.a11y.footerNavLabel}
          className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 sm:mt-10 sm:gap-10 lg:grid-cols-4"
        >
          {blocks.map((block) => (
            <div key={block.title}>
              <h2 className="text-small font-semibold uppercase tracking-label text-paper">
                {block.title}
              </h2>
              <ul className="mt-2 space-y-1 sm:mt-4">
                {block.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      {...(isExternal(link.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-11 items-center gap-1 rounded-full text-small font-semibold text-paper transition-colors duration-150 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-body"
                    >
                      {link.text}
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

        <div className="mt-8 border-t border-hairline-dark pt-5 sm:mt-12 sm:pt-8">
          <h2 className="text-small font-semibold uppercase tracking-label text-paper">
            {messages.footer.social.title}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {socialLinks.map((social) => (
              <li key={social.text}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full text-small font-semibold text-paper transition-colors duration-150 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-body"
                >
                  {social.text}
                  <IconArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">{messages.a11y.newTabHint}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-hairline-dark pt-5 sm:mt-12 sm:pt-8">
          <p className="text-small">{messages.footer.credits}</p>
          <p id="legal-nota" className="mt-1.5 max-w-[65ch] scroll-mt-24 text-small text-paper sm:mt-3">
            {messages.footer.legalNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
