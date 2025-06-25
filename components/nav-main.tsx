"use client";

import {
  BookOpen,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  Mail,
  Network,
  SquareTerminal,
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const PERSONAL_NAV = [
  {
    title: "Job Offers",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    params: "",
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
    title: "Assessments",
    icon: BookOpen,
    isActive: true,
    params: "",
    items: [
      {
        title: "Ovreview",
        url: "/dashboard/assessments",
      },
      // {
      //   title: "Settings",
      //   url: "#",
      // },
    ],
  },
  // {
  //   title: "Models",
  //   url: "#",
  //   icon: Bot,
  //   items: [
  //     {
  //       title: "Genesis",
  //       url: "#",
  //     },
  //     {
  //       title: "Explorer",
  //       url: "#",
  //     },
  //     {
  //       title: "Quantum",
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   title: "Documentation",
  //   url: "#",
  //   // icon: BookOpen,
  //   items: [
  //     {
  //       title: "Introduction",
  //       url: "#",
  //     },
  //     {
  //       title: "Get Started",
  //       url: "#",
  //     },
  //     {
  //       title: "Tutorials",
  //       url: "#",
  //     },
  //     {
  //       title: "Changelog",
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   // icon: Settings2,
  //   items: [
  //     {
  //       title: "General",
  //       url: "#",
  //     },
  //     {
  //       title: "Team",
  //       url: "#",
  //     },
  //     {
  //       title: "Billing",
  //       url: "#",
  //     },
  //     {
  //       title: "Limits",
  //       url: "#",
  //     },
  //   ],
  // },
];
const ORG_NAV = [
  {
    title: "Organization",
    url: "#",
    icon: Network,
    isActive: true,
    params: "",
    items: [
      {
        title: "Ovreview",
        url: "/dashboard/organization",
      },
      // {
      //   title: "Starred",
      //   url: "#",
      // },
      // {
      //   title: "Settings",
      //   url: "#",
      // },
    ],
  },
  {
    title: "Jobs",
    url: "#",
    icon: BriefcaseBusiness,
    isActive: true,
    params: "org_id",
    items: [
      {
        title: "Overview",
        url: (orgId?: string) => `/dashboard/organization/${orgId}/job`,
      },
      // {
      //   title: "Explorer",
      //   url: "#",
      // },
      // {
      //   title: "Quantum",
      //   url: "#",
      // },
    ],
  },

  {
    title: "Assessments",
    url: "#",
    icon: BookOpen,
    isActive: true,
    params: "job_id",
    items: [
      {
        title: "Overview",
        url: (orgId?: string, jobId?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments`,
      },
      {
        title: "Create Assessment",
        url: (orgId?: string, jobId?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/create`,
      },
      // {
      //   title: "Tutorials",
      //   url: "#",
      // },
      // {
      //   title: "Changelog",
      //   url: "#",
      // },
    ],
  },
  {
    title: "Job-Assessment",
    url: "#",
    icon: BookOpen,
    isActive: true,
    params: "assessment_id",
    items: [
      {
        title: "Edit",
        url: (orgId?: string, jobId?: string, assessment_id?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}`,
      },
      {
        title: "Questions",
        url: (orgId?: string, jobId?: string, assessment_id?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/add-questions`,
      },
      {
        title: "Coding",
        url: (orgId?: string, jobId?: string, assessment_id?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/code`,
      },
      // {
      //   title: "Preview",
      //   url: (orgId?: string, jobId?: string, assessment_id?: string) =>
      //     `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/preview`,
      // },
      // {
      //   title: "Responses",
      //   url: (orgId?: string, jobId?: string, assessment_id?: string) =>
      //     `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/responses`,
      // },
      {
        title: "Analytics",
        url: (orgId?: string, jobId?: string, assessment_id?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/analytics`,
      },
    ],
  },

  {
    title: "Invitations",
    url: "#",
    icon: Mail,
    isActive: true,
    params: "assessment_id",
    items: [
      {
        title: "Send Invitation",
        url: (orgId?: string, jobId?: string, assessment_id?: string) =>
          `/dashboard/organization/${orgId}/job/${jobId}/assessments/${assessment_id}/send-invitation`,
      },
    ],
  },
  // {
  //   title: "Job-Invitation",
  //   url: "#",
  //   icon: BookOpen,
  //   isActive: true,
  //   params: "invitation_id",
  //   items: [
  //     {
  //       title: "Edit",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}`,
  //     },
  //     {
  //       title: "Add Questions",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}/add-questions`,
  //     },
  //     {
  //       title: "Add Coding",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}/code`,
  //     },
  //     {
  //       title: "Preview",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}/preview`,
  //     },
  //     {
  //       title: "Responses",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}/responses`,
  //     },
  //     {
  //       title: "Analytics",
  //       url: (orgId?: string, jobId?: string, assessment_id?: string, invitation_id?: string) =>
  //         `/dashboard/organization/${orgId}/job/${jobId}/assessments/${invitation_id}/analytics`,
  //     },
  //   ],
  // },
];

export function NavMain() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const items = pathname.includes("organization") ? ORG_NAV : PERSONAL_NAV;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items
          .filter((item) => !item.params || params[item.params])
          .map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Button
                            variant={"link"}
                            onClick={() => {
                              if (typeof subItem.url === "function") {
                                // @ts-ignore
                                router.push(
                                  subItem.url(
                                    params.org_id as string,
                                    params.job_id as string,
                                    params.assessment_id as string
                                  )
                                );
                              } else {
                                router.push(subItem.url);
                              }
                            }}
                          >
                            <span>{subItem.title}</span>
                          </Button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
