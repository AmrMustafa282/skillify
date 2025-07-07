import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarWrapper } from "@/components/app-sidebar-wrapper";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

export default async function MePage({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);
  console.log(session)
  return (
    <SidebarProvider>
      <AppSidebarWrapper />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="ml-auto mr-4">
              <ModeToggle />

              {
                //@ts-ignore

                session?.user.roles && session?.user?.roles[0].name === "ROLE_ADMIN" && (
                  <Link href={"/admin"}>
                    <Button variant={"secondary"} size={"icon"}>
                      <Settings></Settings>
                    </Button>
                  </Link>
                )
              }
            </div>
          </header>
          <div className="container mx-auto flex-grow pb-8">
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
