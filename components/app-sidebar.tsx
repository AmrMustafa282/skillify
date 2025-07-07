"use client";

import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useScreenSize } from "@/hooks/use-screen-size";

// Props for the client component
interface AppSidebarProps {
  headerContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function AppSidebar({ headerContent, mainContent, footerContent }: AppSidebarProps) {
  const { screenSize, isTablet, isDesktop } = useScreenSize();

  // Determine collapsible mode based on screen size
  let collapsibleMode: "offcanvas" | "icon" | "none" = "offcanvas";

  if (isTablet) {
    collapsibleMode = "icon";
  } else if (isDesktop) {
    collapsibleMode = "icon";
  }

  return (
    <Sidebar collapsible={collapsibleMode}>
      <SidebarHeader>{headerContent}</SidebarHeader>
      <SidebarContent>{mainContent}</SidebarContent>
      <SidebarFooter>{footerContent}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
