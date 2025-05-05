import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { cookies } from "next/headers";
import { API_URL } from "@/config";
import axios from "axios";

const setCookies = async (res: any) => {
  const cookiesStore = await cookies();
  const accessToken = res.data.data.accessToken;
  const refreshToken = res.data.data.refreshToken;
  cookiesStore.set("JWT", accessToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  cookiesStore.set("JWT_REFRESH", refreshToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
};

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              withCredentials: true,
            }
          );

          console.log("res", res.data);
          const user = res.data.data.user;

          if (res.status && user) {
            user.is_subscribed = true;
            setCookies(res);
            return {
              ...user,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.user = user;
        token.name = user.username;
        token.is_subscribed = user.is_subscribed;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.username;
      session.user.username = token.username;
      session.user = token.user;
      session.user.is_subscribed = token.is_subscribed;
      return session;
    },

    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          const res = await axios.post(`${process.env.API_URL}/auth/oauth/google`, {
            email: profile?.email,
            name: profile?.name,
            oauthId: profile?.sub,
          });

          if (!res.data.data.user) {
            throw new Error("GoogleOAuthFailed");
          }

          user.id = res.data.data.user.id;
          user.email = res.data.data.user.email;
          // @ts-ignore
          user.username = user.name;
          await setCookies(res);
          return true;
        }

        if (account?.provider === "github") {
          const res = await axios.post(`${process.env.API_URL}/auth/oauth/github`, {
            email: profile?.email,
            name: profile?.name,
            oauthId: (profile as { id: string })?.id,
          });

          if (!res.data.data.user) {
            throw new Error("GitHubOAuthFailed");
          }

          user.id = res.data.data.user.id;
          user.email = res.data.data.user.email;
          // @ts-ignore
          user.username = user.name;

          await setCookies(res);
          return true;
        }

        return true;
      } catch (error: any) {
        console.error("OAuth sign-in error:", error);

        const backendError = error?.response?.data?.error;

        if (backendError) {
          throw new Error(encodeURIComponent(backendError)); // URL-safe
        }

        throw new Error("OAuthError");
      }
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
