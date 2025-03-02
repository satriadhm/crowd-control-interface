import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  
  // Ambil token dari cookie
  const accessToken = request.cookies.get("accessToken")?.value ?? "";
  const refreshToken = request.cookies.get("refreshToken")?.value ?? "";
  // Ambil token dari header
  const authHeader = request.headers.get("authorization") ?? "";

  const publicPaths: string[] = ["/login/", "/register"];
  const protectedPaths: string[] = ["/dashboard", "/task-management", "/user-management"];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Jika mengakses path yang dilindungi dan tidak ada token di cookie maupun header,
  // redirect ke /login.
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
    "/login",
    "/register",
  ],
};
