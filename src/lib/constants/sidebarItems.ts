import React from "react";
import { useMemo } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux"; // Replace with your actual RootState import
import { Home, Calendar, Inbox, Search, Settings } from "lucide-react"; // Replace with actual icon imports

export interface SideBarItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
}

export const useSideBarData = (): SideBarItem[] => {
  const user_level = useSelector((state: RootState) => state.auth.access_level);

  const items = useMemo<SideBarItem[]>(() => {
    if (user_level === "Employee") {
      return [
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
          title: "Settings",
          url: "/settings/",
          icon: Settings,
        },
      ];
    }

    if (user_level === "Admin" || user_level === "Manager") {
      return [
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
    }

    return [];
  }, [user_level]);

  return items;
};
