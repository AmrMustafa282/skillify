"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CreateOrg from "./create-org";

interface DropDownItem {
  name: string;
  logo: React.ElementType;
  plan: string;
  url: string;
}

export function TeamSwitcher({
  teams,
  personal,
}: {
  teams: (DropDownItem & { id: string })[];
  personal: DropDownItem;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(personal);
  const handleClick = (item: DropDownItem) => {
    setActiveTeam(item);
    router.push(item.url);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={() => handleClick(personal)}
              className={cn(
                pathname.includes("dashboard") && !pathname.includes("organization") && "bg-accent",
                "gap-2 p-2"
              )}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <personal.logo className="size-4 shrink-0" />
              </div>
              {personal.name}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
            {teams.map((item, index) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => handleClick(item)}
                className={cn(
                  pathname.includes("organization") && params.org_id == item.id && "bg-accent",
                  "gap-2 p-2"
                )}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <item.logo className="size-4 shrink-0" />
                </div>
                {item.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <CreateOrg />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
