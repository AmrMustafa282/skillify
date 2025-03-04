// import NextAuth from "next-auth";
// import axios from "axios";
// import type { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import GitHub from "next-auth/providers/github"; // Add GitHub provider
// import { User } from "@/types";

// export const authConfig = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//           email: credentials?.email,
//           password: credentials?.password,
//         });

//         console.log("res", res.data);
//         const user = res.data.data;

//         if (res.status && user) {
//             user.is_subscribed = true;
//           return user; // Return user object if authentication is successful
//         } else {
//           return null; // Return null if authentication fails
//         }
//       },
//     }),

//     // Google Authentication
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     // GitHub Authentication
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   ],

//   // Customize session and JWT behavior
//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     // Handle JWT token creation
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.role = user.roles[0].name;
//         token.is_subscribed = user.is_subscribed;
//       }
//       return token;
//     },

//     // Handle session creation
//     async session({ session, token }: { session: any; token: any }) {
//       session.user.id = token.id;
//       session.user.email = token.email;
//       session.user.role = token.role;
//       session.user.is_subscribed = token.is_subscribed;
//       return session;
//     },

//     // Handle sign-in logic
//     async signIn({ user, account, profile }) {
//       if (account?.provider === "google") {
//         // Call your backend API to find or register the user
//         try {
//           const res = await axios.post(`${process.env.API_URL}/auth/oauth`, {
//             email: profile?.email,
//             name: profile?.name,
//             googleId: profile?.sub,
//           });

//           if (res.data.user) {
//             user.id = res.data.user.id;
//             user.email = res.data.user.email;
//             return true;
//           } else {
//             return false;
//           }
//         } catch (error) {
//           console.error("Error during Google sign-in:", error);
//           return false;
//         }
//       }

//       if (account?.provider === "github") {
//         // Call your backend API to find or register the user
//         try {
//           const res = await axios.post(`${process.env.API_URL}/auth/oauth`, {
//             email: profile?.email,
//             name: profile?.name,
//             githubId: profile?.sub,
//           });

//           if (res.data.user) {
//             user.id = res.data.user.id;
//             user.email = res.data.user.email;
//             return true;
//           } else {
//             return false;
//           }
//         } catch (error) {
//           console.error("Error during GitHub sign-in:", error);
//           return false;
//         }
//       }

//       // For credentials provider, proceed as usual
//       return true;
//     },
//   },

//   // Custom pages (optional)
//   pages: {
//     signIn: "/login", // Custom sign-in page
//   },
// } satisfies NextAuthOptions;

// const handler = NextAuth(authConfig);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

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
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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

            // Extract accessToken and refreshToken from the response
            const accessToken = user.accessToken;
            const refreshToken = user.refreshToken;

            // Return the user object along with the tokens
            return {
              ...user,
              accessToken,
              refreshToken,
            };
          } else {
            return null; // Return null if authentication fails
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    // Google Authentication
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // GitHub Authentication
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  // Customize session and JWT behavior
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Handle JWT token creation
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.is_subscribed = user.is_subscribed;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    // Handle session creation
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.username;
      session.user.is_subscribed = token.is_subscribed;
      session.accessToken = token.accessToken; // Include accessToken in the session
      session.refreshToken = token.refreshToken; // Include refreshToken in the session
      return session;
    },

    // Handle sign-in logic
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Call your backend API to find or register the user
        try {
          const res = await axios.post(`${process.env.API_URL}/auth/oauth`, {
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

      if (account?.provider === "github") {
        // Call your backend API to find or register the user
        try {
          const res = await axios.post(`${process.env.API_URL}/auth/oauth`, {
            email: profile?.email,
            name: profile?.name,
            githubId: profile?.sub,
          });

          if (res.data.user) {
            user.id = res.data.user.id;
            user.email = res.data.user.email;
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error during GitHub sign-in:", error);
          return false;
        }
      }

      // For credentials provider, proceed as usual
      return true;
    },
  },

  // Custom pages (optional)
  pages: {
    signIn: "/login", // Custom sign-in page
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
