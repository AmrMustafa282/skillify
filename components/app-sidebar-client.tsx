"use client";

import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is a client component wrapper for the server component
export function AppSidebarClient({
  children,
  headerContent,
  mainContent,
  footerContent,
}: {
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>{headerContent}</SidebarHeader>
      <SidebarContent>{mainContent}</SidebarContent>
      <SidebarFooter>{footerContent}</SidebarFooter>
      <SidebarRail />
      {children}
    </Sidebar>
  );
}
