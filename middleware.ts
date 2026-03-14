/**
 * Middleware — protection des routes /admin/* (sauf /admin/login).
 * Redirige vers /admin/login si non authentifié.
 * CDC v1.4
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laisser passer tout ce qui n'est pas sous /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Toujours autoriser la page de login
  if (pathname === "/admin/login" || pathname === "/admin/login/") {
    return NextResponse.next();
  }

  // Pour les autres routes /admin/* : vérifier le cookie JWT
  const token = request.cookies.get("yehi_admin_token")?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
  const payload = await verifyToken(token);
  if (!payload) {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("yehi_admin_token");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
