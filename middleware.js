import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token will exist if user logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (token) {
    // Signed in
    console.log("JSON Web Token accepted, redirecting to home");
    if (req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // Not Signed in
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/",
};
