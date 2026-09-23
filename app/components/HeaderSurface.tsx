"use client";

import { useEffect } from "react";

/**
 * Adaptive-header sensor (D47/D49). Publishes the polarity of the section
 * under the sticky bar as data attributes on <html> and marks the matching
 * header link with `aria-current="location"` (scrollspy). rAF-throttled read,
 * no layout thrash, no visible UI; server default is dark (the hero is ink) so
 * the first paint is already correct. Progressive enhancement: without JS the
 * header stays ink and no link is marked current.
 *
 * D92: alongside the polarity it publishes `data-header-tint`, true when the
 * section under the bar is a BLUE tint (`mist`/`brand-soft`) — the header then
 * drops its bottom shadow and dissolve band. Absent attribute → "false", so
 * `paper`/dark sections keep the usual treatment.
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
    let lastTint = "";
    let lastScrolled = "";
    let lastId = "";

    const update = () => {
      frame = 0;
      const line = 104; // just below the 5rem bar; slightly past scroll-padding-top
      // (6rem ≈ 96px) so an anchored section is marked active right after the jump.
      let surface = "dark";
      let tint = "false";
      let currentId = "";
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= line && bottom > line) {
          surface = section.dataset.surface === "light" ? "light" : "dark";
          tint = section.dataset.headerTint === "true" ? "true" : "false";
          currentId = section.id;
          break;
        }
      }
      const scrolled = window.scrollY > 8 ? "true" : "false";

      if (surface !== lastSurface) {
        root.dataset.headerSurface = surface;
        lastSurface = surface;
      }
      if (tint !== lastTint) {
        root.dataset.headerTint = tint;
        lastTint = tint;
      }
      if (scrolled !== lastScrolled) {
        root.dataset.headerScrolled = scrolled;
        lastScrolled = scrolled;
      }
      if (currentId !== lastId) {
        lastId = currentId;
        // Only the FIRST link that matches gets marked: Talent and Companies
        // share the `#talento` anchor (D75/D76), so marking every match would
        // light up two nav items at once.
        let marked = false;
        for (const link of links) {
          if (!marked && link.getAttribute("href") === `#${currentId}`) {
            link.setAttribute("aria-current", "location");
            marked = true;
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
