import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/admin"];
  const publicPaths = ["/login", "/register"];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isProtectedPath) {
    const authHeader = request.headers.get("authorization");
    let token;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      console.warn("No token found in Authorization header");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    request.headers.set("access-token", token);

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
