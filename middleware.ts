export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/dashboard/:path*", "/assessments/:path*", "/subscription/:path*"],
};
