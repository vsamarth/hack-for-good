import AppSidebar from "@/components/dashboard-sidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-8">{children}</main>
    </SidebarProvider>
  );
}
