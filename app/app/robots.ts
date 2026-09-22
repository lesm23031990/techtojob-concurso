import type { MetadataRoute } from "next";
import { site } from "@/content";

/** Open to every crawler; no backend routes exist to disallow (frontend-only
 *  contest project — AGENTS.md "solo frontend + SEO"). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
