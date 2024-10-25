import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const MainLayout = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="flex h-screen w-full">
      {isLoggedIn ? (
        <SidebarProvider>
          {/* Sidebar */}
          <div className="w-64">
            <AppSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header Section */}
            <section className="flex items-center p-4 border-b">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mx-2" />
              <p className="">
                {location.pathname.substring(1, location.pathname.length - 1)}
              </p>
            </section>

            {/* Outlet Content */}
            <div className="p-4 flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
};

export default MainLayout;
