import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ru", "az"],
  defaultLocale: "ru",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔴 ВАЖНО: пропускаем служебные файлы БЕЗ intl
  if (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  // 🔐 Admin routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const isAuthenticated =
      request.cookies.get("admin-authenticated")?.value === "true";

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  // 🌍 Locale routing
  return intlMiddleware(request);
}

/**
 * ❗ ВАЖНО
 * matcher БЕЗ regex-групп
 */
export const config = {
  matcher: ["/:path*"],
};
