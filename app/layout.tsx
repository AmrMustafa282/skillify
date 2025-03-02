import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkIllIfy.io - Cutting-Edge Software Solutions",
  description:
    "SkIllIfy.io delivers innovative, high-performance software solutions for businesses of the future.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {/* <MouseMoveEffect /> */}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <main className="flex flex-col  h-screen">
          <AuthProvider>
            <div>{children}</div>
          </AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </main>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
