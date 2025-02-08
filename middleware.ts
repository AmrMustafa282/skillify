// import { authConfig } from "@/app/api/auth/[...nextauth]/route";
// import NextAuth from "next-auth";

// const { auth } = NextAuth(authConfig);

// export default auth((req: any) => {
//  const isAuthenticated = !!req.auth;

//  if (!isAuthenticated) {
//    return Response.redirect(new URL("/login", req.url));
//  }
// });

// // Apply middleware to specific routes
// export const config = {
//  matcher: ["/dashboard/:path*"], // Protect all routes under /dashboard
// };

export default function Middleware() {
  return null;
}
