import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation + `/en` rewriting (spec 12-i18n). Matcher follows the
 * next-intl recipe: skip Next internals, the (nonexistent) API surface and
 * any path with a file extension (static assets like /brand/*.svg, fonts).
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
