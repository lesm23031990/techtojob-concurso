import type { Messages } from "@/content";
import type { routing } from "@/i18n/routing";

/**
 * Project-level next-intl typing (spec 12-i18n, I6). Declares the app's locale
 * union and message shape, so `getMessages()` / `useMessages()` return the
 * same `Messages` interface the catalogs are checked against — no `any`.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
