"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Home, Plus } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DropDownItem {
  name: string;
  url: string;
}

export function TeamSwitcher({
  orgs,
  personal,
}: {
  orgs: (DropDownItem & { id: string })[];
  personal: DropDownItem;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { isMobile } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const isPersonalActive = pathname.includes("dashboard") && !pathname.includes("organization");
  const [activeTeam, setActiveTeam] = React.useState(
    isPersonalActive ? personal : orgs.find((org) => org.id === params.org_id) || personal
  );

  const handleSelect = (item: DropDownItem) => {
    setActiveTeam(item);
    router.push(item.url);
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
              <div className="flex  aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Home className="size-4 shrink-0" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] min-w-56 p-0 flex flex-col"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <Button
              variant="ghost"
              className={cn(
                "flex w-full justify-start gap-2 rounded-none px-2 py-3 text-sm font-normal",
                isPersonalActive && "bg-accent"
              )}
              onClick={() => handleSelect(personal)}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Home className="size-4 shrink-0" />
              </div>
              <span>{personal.name}</span>
              {isPersonalActive && <Check className="ml-auto" />}
            </Button>

            <Separator />

            {/* Organizations combobox in the middle */}
            <div className="pt-1 ">
              {/* <p className="px-2 text-xs font-medium text-muted-foreground mb-2">Teams</p> */}
              {/* <Separator /> */}
              <Command className=" ">
                <div className="flex items-center">
                  {/* <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" /> */}
                  <CommandInput
                    placeholder="Search organization..."
                    className="h-9 flex-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <CommandList>
                  <CommandEmpty>No organization found.</CommandEmpty>
                  <CommandGroup>
                    {orgs.map((org) => (
                      <CommandItem key={org.id} value={org.name} onSelect={() => handleSelect(org)}>
                        {org.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            pathname.includes("organization") && params.org_id === org.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            <Separator />

            {/* Create organization at the bottom */}
            <Button
              variant="ghost"
              className="flex w-full justify-start gap-2 rounded-none px-2 py-3 text-sm font-normal"
              onClick={() => {
                router.push("/dashboard/organization/create");
                setOpen(false);
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Plus className="size-4 shrink-0" />
              </div>
              <span>Create Organization</span>
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
