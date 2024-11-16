import {
  Calendar,
  Home,
  Inbox,
  LucideProps,
  Search,
  Settings,
} from "lucide-react";
import React from "react";

export interface SideBarItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Stock",
    url: "/stock/",
    icon: Calendar,
  },
  {
    title: "Sales",
    url: "/sales/",
    icon: Inbox,
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
