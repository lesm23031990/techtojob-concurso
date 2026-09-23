"use client";

import { useEffect } from "react";

/**
 * Adaptive-header sensor (D47/D49). Publishes the polarity of the section
 * under the sticky bar as data attributes on <html> and marks the matching
 * header link with `aria-current="location"` (scrollspy). D125: detection uses
 * an IntersectionObserver 1px band at 104px instead of a per-frame
 * `getBoundingClientRect()`, killing the forced-reflow Lighthouse insight; the
 * scroll listener now only toggles the `scrolled` flag (a cheap `scrollY`
 * read). No visible UI; server default is dark (the hero is ink) so the first
 * paint is already correct. Without JS the header stays ink.
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

    let lastSurface = "";
    let lastTint = "";
    let lastScrolled = "";

    const apply = (section: HTMLElement | null) => {
      const surface = section?.dataset.surface === "light" ? "light" : "dark";
      const tint = section?.dataset.headerTint === "true" ? "true" : "false";
      const currentId = section?.id ?? "";
      if (surface !== lastSurface) {
        root.dataset.headerSurface = surface;
        lastSurface = surface;
      }
      if (tint !== lastTint) {
        root.dataset.headerTint = tint;
        lastTint = tint;
      }
      // Only the FIRST link that matches gets marked: Talent and Companies are
      // one section, so marking every match would light up two nav items.
      let marked = false;
      for (const link of links) {
        if (!marked && currentId && link.getAttribute("href") === `#${currentId}`) {
          link.setAttribute("aria-current", "location");
          marked = true;
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };

    const LINE = 104; // just below the 5rem bar; past scroll-padding-top (6rem)
    const active = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      active.clear();
      const band = Math.max(1, Math.round(window.innerHeight - LINE - 1));
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target);
            else active.delete(entry.target);
          }
          const first = sections.find((section) => active.has(section)) ?? null;
          apply(first);
        },
        { rootMargin: `-${LINE}px 0px -${band}px 0px`, threshold: 0 },
      );
      for (const section of sections) observer.observe(section);
    };

    const onScroll = () => {
      const scrolled = window.scrollY > 8 ? "true" : "false";
      if (scrolled !== lastScrolled) {
        root.dataset.headerScrolled = scrolled;
        lastScrolled = scrolled;
      }
    };

    connect();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", connect, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", connect);
    };
  }, []);

  return null;
}
