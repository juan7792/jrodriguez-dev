
import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    locales.find((value) => value === requestedLocale) ??
    defaultLocale;

  const [technical, business] = await Promise.all([
    import(`../messages/technical/${locale}.json`),
    import(`../messages/business/${locale}.json`)
  ]);

  return {
    locale,
    messages: {
      ...technical.default,
      ...business.default
    }
  };
});
