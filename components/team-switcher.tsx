"use client";

import * as React from "react";
import { ChevronsUpDown, Home, Building2, HomeIcon, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const isOrganizationMode = pathname.includes("/organization");

  const currentMode = {
    name: isOrganizationMode ? "Organization" : "Personal",
    icon: isOrganizationMode ? Building2 : User,
    url: isOrganizationMode ? "/dashboard/organization" : "/dashboard",
  };

  const alternativeMode = {
    name: isOrganizationMode ? "Personal" : "Organization",
    icon: isOrganizationMode ? User : Building2,
    url: isOrganizationMode ? "/dashboard" : "/dashboard/organization",
  };

  const handleModeSwitch = () => {
    router.push(alternativeMode.url);
    setOpen(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <currentMode.icon className="size-4 shrink-0" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{currentMode.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] min-w-56 p-0"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <Button
              variant="ghost"
              className="flex w-full justify-start gap-2 rounded-none px-2 py-3 text-sm font-normal hover:bg-accent"
              onClick={() => router.push("/")}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <HomeIcon className="size-4 shrink-0" />
              </div>
              <span>Home</span>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full justify-start gap-2 rounded-none px-2 py-3 text-sm font-normal hover:bg-accent"
              onClick={handleModeSwitch}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <alternativeMode.icon className="size-4 shrink-0" />
              </div>
              <span>Switch to {alternativeMode.name}</span>
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
