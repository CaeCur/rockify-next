import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token will exist if user logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  console.log(pathname);

  // Invalid token, don't allow access to protected routes. NEXT Middleware requires path to be defined, simply checking for !token doesn't work
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Active token, redirect if /login accessed
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
