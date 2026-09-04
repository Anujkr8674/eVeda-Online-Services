import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const CRM_PROTECTED = ["/dashboard"];
const CRM_AUTH_PAGES = ["/admin", "/telecallers", "/superadmin"];

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ?? "fallback-dev-secret"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass pathname as request header for layout detection
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });

  // Also set on response headers for legacy cases
  res.headers.set("x-pathname", pathname);

  // Protect dashboard routes
  if (CRM_PROTECTED.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("crm-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    try {
      await jwtVerify(token, secret);
      return res;
    } catch {
      const response = NextResponse.redirect(new URL("/admin", req.url));
      response.cookies.delete("crm-token");
      return response;
    }
  }

  // Redirect logged-in users away from auth pages
  if (CRM_AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("crm-token")?.value;
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        /* invalid token — let them through */
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
