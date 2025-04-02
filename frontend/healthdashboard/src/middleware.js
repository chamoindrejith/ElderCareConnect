import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { authRoutes, commonRoutes, caregiverRoutes, elderRoutes } from "@/lib/routes";

const middleware = async (req) => {
  const { nextUrl: url } = req;
  const res = NextResponse.next();
  const token = await getCookie("token", { res, req });
  const role = await getCookie("role", { res, req }); // Retrieve user role

  const isAuthRoute = authRoutes.includes(url.pathname);
  const isCommonRoute = commonRoutes.includes(url.pathname);
  const isCaregiverRoute = caregiverRoutes.includes(url.pathname);
  const isElderRoute = elderRoutes.includes(url.pathname);

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  if (isCommonRoute) {
    return NextResponse.next();
  }

  if (role === "caregiver" && isCaregiverRoute) {
    return NextResponse.next();
  }

  if (role === "elder" && isElderRoute) {
    return NextResponse.next();
  }

  // Redirect unauthorized access
  return NextResponse.redirect(new URL("/", url.origin));
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
  ],
};

export default middleware;
