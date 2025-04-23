import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";

// const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "SkIllIfy.io - Cutting-Edge Software Solutions",
  description:
    "SkIllIfy.io delivers innovative, high-performance software solutions for businesses of the future.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background text-foreground antialiased`}>
        {/* <MouseMoveEffect /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col h-screen">
            <AuthProvider>
              <div>{children}</div>
            </AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
