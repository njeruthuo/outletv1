import { useSideBarData, SideBarItem } from "@/lib/constants/sidebarItems";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ show, toggle }: { show?: boolean; toggle?: () => void }) => {
  const location = useLocation();
  const items = useSideBarData();

  return (
    <section className="bg-custom1 text-white w-64 h-screen p-4 space-y-4">
      <img
        className="hover:cursor-pointer sm:hidden"
        onClick={toggle}
        src={show ? "/right-open.svg" : "/right-close.svg"}
        alt=""
      />

      {items?.map((item: SideBarItem, index: number) => {
        const isActive = location.pathname === item.url;
        const Icon = item.icon;

        return (
          <Link
            to={item.url}
            key={index}
            className={`flex items-center p-2 rounded-md transition-colors ${
              isActive ? "bg-[#213144]" : "hover:bg-[#30435E]"
            }`}
          >
            <Icon className="mr-3 w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default Sidebar;
