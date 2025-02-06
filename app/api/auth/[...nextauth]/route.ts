import NextAuth from "next-auth";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authConfig = {
 providers: [
  Credentials({
   name: "Credentials",
   credentials: {
    username: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
   },
   async authorize(credentials) {
    const res = await axios.post("http://localhost:9090/login", {
     username: credentials?.username,
     password: credentials?.password,
    });

    const user = res.data.data;

    if (res.status && user) {
     return user; // Return user object if authentication is successful
    } else {
     return null; // Return null if authentication fails
    }
   },
  }),

  // Google Authentication
  Google({
   clientId: process.env.GOOGLE_CLIENT_ID!,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
 ],

 // Customize session and JWT behavior
 session: {
  strategy: "jwt",
 },

 callbacks: {
  // Handle JWT token creation
  async jwt({ token, user }) {
   if (user) {
    token.id = user.id;
    token.email = user.email;
   }
   return token;
  },

  // Handle session creation
  async session({ session, token }:{ session: any, token: any }) {
   session.user.id = token.id;
   session.user.email = token.email;
   return session;
  },

  // Handle sign-in logic
  async signIn({ user, account, profile }) {
   if (account?.provider === "google") {
    // Call your backend API to find or register the user
    try {
     const res = await axios.post("http://localhost:9090/google", {
      email: profile?.email,
      name: profile?.name,
      googleId: profile?.sub,
     });

     if (res.data.user) {
      user.id = res.data.user.id;
      user.email = res.data.user.email;
      return true;
     } else {
      return false;
     }
    } catch (error) {
     console.error("Error during Google sign-in:", error);
     return false;
    }
   }
   return true;
  },
 },
 pages: {
  signIn: "/auth/signin", // Custom sign-in page
 },
} satisfies NextAuthOptions;

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
