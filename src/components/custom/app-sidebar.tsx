import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Sales",
    url: "/sales/",
    icon: Inbox,
  },
  {
    title: "Stock",
    url: "/stock/",
    icon: Calendar,
  },
  {
    title: "Reports",
    url: "/reports/",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings/",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="font-light text-white">
          {/* <SidebarGroupLabel className="mt-3 text-black text-lg">
            Application
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className=" my-4">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="font-semibold text-xl"
                >
                  <SidebarMenuButton asChild className="my-2">
                    <Link to={item.url}>
                      <item.icon className="text-lg" />
                      <span className=" ">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
