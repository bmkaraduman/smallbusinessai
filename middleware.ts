import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["nl", "tr", "de", "en"];
const defaultLocale = "nl";

/**
 * Picks the best locale from the browser's Accept-Language header.
 * Falls back to Dutch — our primary market.
 */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (locales.includes(tag)) return tag;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
