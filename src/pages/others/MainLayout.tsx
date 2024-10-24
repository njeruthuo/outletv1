import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const MainLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              <Outlet />
            </main>
          </SidebarProvider>
        </>
      ) : (
        <>
          <Navigate to={"/sign-in"} />
        </>
      )}
    </div>
  );
};
export default MainLayout;
