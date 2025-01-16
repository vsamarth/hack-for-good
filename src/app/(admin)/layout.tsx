import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="p-8 w-full">{children}</main>
    </SidebarProvider>
  );
}
