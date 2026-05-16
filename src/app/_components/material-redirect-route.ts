import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_LANG, LANG_COOKIE_NAME, isSupportedLang } from "@/lib/i18n";
import type { MaterialPageSlug } from "@/lib/material-catalog";

export async function redirectToLocalizedMaterialRoute(category: MaterialPageSlug) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANG_COOKIE_NAME)?.value;
  const preferredLang = isSupportedLang(cookieLang) ? cookieLang : DEFAULT_LANG;

  redirect(`/${preferredLang}/${category}`);
}
