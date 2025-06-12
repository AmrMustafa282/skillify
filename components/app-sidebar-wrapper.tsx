import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { AppSidebar } from "@/components/app-sidebar";

import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

export async function AppSidebarWrapper() {
  const session = await getServerSession(authConfig);
  let USER;

  if (session) {
    USER = session.user;
  }

  return (
    <AppSidebar
      headerContent={<TeamSwitcher />}
      mainContent={<NavMain />}
      footerContent={<NavUser user={USER} />}
    />
  );
}
