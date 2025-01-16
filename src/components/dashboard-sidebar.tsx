"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import { Icons } from "./icons";

export const company = {
  name: "Acme Inc",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
};

type NavItem = {
  title: string;
  url: string;
  icon: keyof typeof Icons;
};

const peopleItems: NavItem[] = [
  { title: "Residents", url: "/residents", icon: "user" },
  { title: "Staff", url: "/staff", icon: "user2" },
];

const inventoryItems: NavItem[] = [
  {
    title: "Products",
    url: "/products",
    icon: "product" as const,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: "voucher" as const,
  },
  {
    title: "Auctions",
    url: "/auctions",
    icon: "auction" as const,
  },
];

export default function AppSidebar() {
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>People</SidebarGroupLabel>
          <SidebarMenu>
            {peopleItems.map((item) => {
                const Icon = Icons[item.icon];
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Icon />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarMenu>
            {inventoryItems.map((item) => {
                const Icon = Icons[item.icon];
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Icon />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
