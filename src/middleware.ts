import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "semogaTAselesaidenganbaik";

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
    let token = request.cookies.get("accessToken")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      if (pathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      if (err instanceof Error) {
        console.error("Invalid token:", err.message);
      } else {
        console.error("Invalid token:", err);
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
