import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("accessToken") || localStorage.getItem("accessToken");

  if (!token) {
    console.warn("Access attempt to /admin without a valid token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));

    // Log the decoded user for debugging purposes
    console.log("Decoded token:", decoded);

    if (decoded.role !== "admin") {
      console.warn(`Access denied. User role: ${decoded.role}`);
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Invalid token:", error);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
