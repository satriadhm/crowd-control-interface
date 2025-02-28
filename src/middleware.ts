import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value ?? "";
  const refreshToken = request.cookies.get("refreshToken")?.value ?? "";

  const publicPaths: string[] = ["/login/", "/register"];
  const protectedPaths: string[] = [
    "/dashboard",
    "/task-management",
    "/user-management",
  ];

  console.log(pathname);

  const isPublicPath: boolean = publicPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isProtectedPath: boolean = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isProtectedPath && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/task-management:path*",
    "/user-management:path*",
    "/login",
    "/register",
  ],
};
