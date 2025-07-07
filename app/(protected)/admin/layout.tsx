import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { getServerSession } from "next-auth";

import { authConfig } from "@/app/api/auth/[...nextauth]/route";
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);
  if (session?.user?.roles[0].name !== "ROLE_ADMIN") return;

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
