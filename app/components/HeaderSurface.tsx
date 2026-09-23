"use client";

import { useEffect } from "react";

/**
 * Adaptive-header sensor (D47/D49). Publishes the polarity of the section
 * under the sticky bar as data attributes on <html> and marks the matching
 * header link with `aria-current="location"` (scrollspy). rAF-throttled read,
 * no layout thrash, no visible UI; server default is dark (the hero is ink) so
 * the first paint is already correct. Progressive enhancement: without JS the
 * header stays ink and no link is marked current.
 */
export default function HeaderSurface() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-surface]"),
    );
    if (sections.length === 0) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        "#site-header .header-nav-link, #site-header .header-menu-link",
      ),
    );

    let frame = 0;
    let lastSurface = "";
    let lastScrolled = "";
    let lastId = "";

    const update = () => {
      frame = 0;
      const line = 72; // just below the 5rem sticky bar
      let surface = "dark";
      let currentId = "";
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= line && bottom > line) {
          surface = section.dataset.surface === "light" ? "light" : "dark";
          currentId = section.id;
          break;
        }
      }
      const scrolled = window.scrollY > 8 ? "true" : "false";

      if (surface !== lastSurface) {
        root.dataset.headerSurface = surface;
        lastSurface = surface;
      }
      if (scrolled !== lastScrolled) {
        root.dataset.headerScrolled = scrolled;
        lastScrolled = scrolled;
      }
      if (currentId !== lastId) {
        lastId = currentId;
        for (const link of links) {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
