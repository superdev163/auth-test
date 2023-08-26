import { authRoutes } from "@/routes/authRoutes";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("userId")?.value;
  const token = request.cookies.get("token")?.value;
  const isAuth = currentUser && token
  if (
    protectedRoutes.includes(request.nextUrl.pathname) && !isAuth
  ) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}