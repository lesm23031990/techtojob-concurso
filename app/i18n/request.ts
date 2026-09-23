import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { messagesByLocale } from "@/content";

/**
 * Request-scoped messages. Each locale renders from its own typed catalog
 * (`content.ts` checks both against the same `Messages` interface, so a key
 * missing in either file is a compile-time error — R36 / I6).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return { locale, messages: messagesByLocale[locale] };
});
