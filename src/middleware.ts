// File: src/middleware.ts

import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/login", "/register"];
  const protectedPaths = ["/dashboard", "/admin"];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isActive = request.nextUrl.searchParams.has("creds");

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isProtectedPath && !isActive) {
    // munculkan pesan error jika user belum login
    console.error("User is not authenticated");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
