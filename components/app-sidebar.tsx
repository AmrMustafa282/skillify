import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { View } from "@/types";

import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { server } from "@/lib/api";
import { API_URL } from "@/config";

const DATA = {
  [View.PERSONAL]: {
    navMain: [
      {
        title: "Job Offers",
        url: "#",
        // icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Ovreview",
            url: "dashboard/",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        // icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        // icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        // icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        // icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        // icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        // icon: Map,
      },
    ],
  },
  [View.ORGANIZATION]: {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
        url: "/dashboard/organization/1",
        id: "1",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
        url: "/dashboard/organization/2",
        id: "2",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
        url: "/dashboard/organization/3",
        id: "3",
      },
    ],
    navMain: [
      {
        title: "Job Offers",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Ovreview",
            url: "dashboard/",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  },
};

const PERSONAL_ORG = {
  name: "Personal",
  plan: "Free",
  url: "/dashboard",
};

export async function AppSidebar() {
  const session = await getServerSession(authConfig);
  // console.log(session?.user)
  let USER = { username: "", email: "", avatar: "" };
  let ORGS;
  if (session) {
    USER = {
      username: session.user?.username || "",
      email: session.user?.email || "",
      avatar: "",
    };
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher orgs={ORGS} personal={PERSONAL_ORG} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {/* <NavProjects projects={DATA["personal"].projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={USER} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
