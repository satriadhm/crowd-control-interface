import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("accessToken") || localStorage.getItem("accessToken");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = JSON.parse(atob(token.split(".")[1]));
  if (decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
