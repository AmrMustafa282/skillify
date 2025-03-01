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
  House
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
import { useSession } from "next-auth/react";

const DATA = {
  [View.PERSONAL]: {
    user: {
      name: "admin",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
        url: "/dashboard/organization/1",
        id:"1"
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
        url: "/dashboard/organization/2",
        id:"2"
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
        url: "/dashboard/organization/3",
        id:"3"
      },
    ],
    personal: {
      name: "Personal",
      logo: House,
      plan: "Free",
      url: "/dashboard",
    },
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
  [View.ORGANIZATION]: {
    user: {
      name: "admin",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
        url: "/dashboard/organization/1",
        id:"1"
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
        url: "/dashboard/organization/2",
        id:"2"
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
        url: "/dashboard/organization/3",
        id:"3"
      },
    ],
    personal: {
      name: "Personal",
      logo: House,
      plan: "Free",
      url: "/dashboard",
    },
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  view: View;
}

export function AppSidebar({ view, ...props }: AppSidebarProps) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={DATA[view].teams} personal={DATA[view].personal} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={DATA[view].navMain} />
        <NavProjects projects={DATA[view].projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={DATA[view].user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
