import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANG_COOKIE_NAME, isSupportedLang } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const [, pathLang] = request.nextUrl.pathname.split("/");
  const cookieLang = request.cookies.get(LANG_COOKIE_NAME)?.value;
  const siteLang = isSupportedLang(pathLang)
    ? pathLang
    : isSupportedLang(cookieLang)
      ? cookieLang
      : DEFAULT_LANG;

  requestHeaders.set("x-site-lang", siteLang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
