import createMiddleware from "next-intl/middleware";
import {NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";
import {SESSION_COOKIE} from "./lib/auth/contracts";

const internationalize = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const isConsoleRoute = routing.locales.includes(segments[0] as (typeof routing.locales)[number])
    && segments[1] === "console";

  if (isConsoleRoute && !request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${segments[0]}/login`;
    loginUrl.search = "?returnTo=/console";
    return NextResponse.redirect(loginUrl);
  }

  return internationalize(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
