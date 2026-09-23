import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. `Link` emits the real `<a href>` of the
 * target locale (spec 12-i18n, I5): passing a `locale` prop renders the
 * matching `hreflang` and URL, with zero client JavaScript.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
