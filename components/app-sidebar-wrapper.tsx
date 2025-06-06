import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { AppSidebar } from "@/components/app-sidebar";

import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { server } from "@/lib/api";
import { API_URL } from "@/config";

const PERSONAL_ORG = {
  name: "Personal",
  plan: "Free",
  url: "/dashboard",
};

export async function AppSidebarWrapper() {
  const session = await getServerSession(authConfig);
  let USER;
  let ORGS = [];

  if (session) {
    USER = session.user;
    try {
      const res = await server.get(`${API_URL}/orgs/user/current`);
      ORGS = res.data.data.map((org: any) => ({
        name: org.name,
        plan: org.plan,
        url: `/dashboard/organization/${org.id}`,
        id: org.id,
      }));
    } catch (error) {
      console.error("Error during fetching orgs:", error);
    }
  }

  return (
    <AppSidebar
      headerContent={<TeamSwitcher orgs={ORGS} personal={PERSONAL_ORG} />}
      mainContent={<NavMain />}
      footerContent={<NavUser user={USER} />}
    />
  );
}
