import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /enquiries (but allow /enquiries/login through)
  if (pathname.startsWith("/enquiries") && !pathname.startsWith("/enquiries/login")) {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/enquiries/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/enquiries/:path*"],
};
