import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RootState } from "@/store/store";
import { Sidebar } from "@/components/custom";
import { LeftSection } from "@/components/MainLayoutComponents";

const MainLayout = () => {
  const location = useLocation();

  const auth = useSelector((state: RootState) => state.auth);

  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const hideMenu = () => setShowSideMenu((prev: boolean) => !prev);

  // console.log(localStorage.getItem("authToken"), "logged in");

  return (
    <div className="flex h-screen w-full place-items-center">
      {auth.isLoggedIn ? (
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {showSideMenu && (
              <div className="w-72 bg-custom1 h-screen text-white">
                <Sidebar />
              </div>
            )}

            <div className="p-4 w-full">
              <div className="flex gap-2 mb-4 w-full h-12 place-items-center">
                <img
                  className="hover:cursor-pointer"
                  onClick={hideMenu}
                  src={showSideMenu ? "/right-open.svg" : "/right-close.svg"}
                  alt=""
                />

                <span className="text-2xl pl-2">
                  {location.pathname.length > 2
                    ? location.pathname.split("/")[1]
                    : "Dashboard"}
                </span>

                {/* Here */}
                <LeftSection />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
};

export default MainLayout;
