import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token will exist if user logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  url.pathname = "/login";

  //allow req if following is true
  //1) req is for next-auth session
  //2) token exists
  if (pathname.includes("/api/auth")) {
    console.log("PATHNAME VALID FOR NO TOKEN");
    console.log(pathname);
    return NextResponse.next();
  }

  if (token) {
    console.log("TOKEN EXISTS, CONTINUING");
    console.log(token);
    return NextResponse.next(); //let user continue
  }

  // redirect if no token and req a protected route
  if (!token && pathname !== "/login") {
    console.log("NO TOKEN, REDIRECTING TO LOGIN");
    console.log("PATHNAME: ", pathname);
    return NextResponse.redirect(url);
  }
}
