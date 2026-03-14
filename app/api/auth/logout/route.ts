import { NextResponse } from "next/server";
import { getCookieName, getCookieOptions } from "@/lib/auth";

export async function POST() {
  const res = new NextResponse(null, { status: 302, headers: { Location: "/admin/login" } });
  res.cookies.set(getCookieName(), "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  return res;
}
