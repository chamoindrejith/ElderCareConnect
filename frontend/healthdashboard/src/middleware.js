import { NextResponse } from "next/server";
import {getCookie} from "cookies-next"
import {authRoutes} from "@/lib/routes"

const middleware = async (req) => {
  const { nextUrl: url } = req;
  const res = NextResponse.next();
  const token = await getCookie('token', { res, req });
  
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }
  return res;
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
