import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value ?? "";
  const refreshToken = request.cookies.get("refreshToken")?.value ?? "";
  const authHeader = request.headers.get("authorization") ?? "";

  // Public paths that don't require authentication
  const publicPaths: string[] = ["/login", "/register", "/"];

  // Protected paths that require authentication
  const protectedPaths: string[] = [
    "/dashboard",
    "/task-management",
    "/user-management",
    "/eval",
    "/profile",
    "/worker-analysis",
    "/test-result",
    "/edit-profile",
    "/validate-question",
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If this is a prerendering request (from Next.js build), skip auth check
  const isPrerendering = request.headers.get("x-prerender") === "1";

  if (isPrerendering) {
    return NextResponse.next();
  }

  // Allow public paths without authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access protected path without auth
  if (isProtectedPath && !accessToken && !refreshToken && !authHeader) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/task-management/:path*",
    "/user-management/:path*",
    "/profile/:path*",
    "/eval/:path*",
    "/worker-analysis/:path*",
    "/test-result/:path*",
    "/login",
    "/register",
    "/edit-profile",
    "/validate-question",
  ],
};
