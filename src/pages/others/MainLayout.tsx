import { Sidebar } from "@/components/custom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet, useLocation } from "react-router-dom";

interface State {
  auth?: {
    isLoggedIn: boolean;
  };
}

const MainLayout = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state: State) => state?.auth?.isLoggedIn);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const hideMenu = () => setShowSideMenu((prev: boolean) => !prev);

  return (
    <div className="flex h-screen w-full ">
      {isLoggedIn ? (
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {showSideMenu && (
              <div className="w-72 bg-custom1 h-screen text-white">
                <Sidebar />
              </div>
            )}

            <div className="p-4 w-full">
              <div className="flex gap-2 mb-4">
                <img
                  className="hover:cursor-pointer"
                  onClick={hideMenu}
                  src={showSideMenu ? "/right-open.svg" : "/right-close.svg"}
                  alt=""
                />{" "}
                <span className="border-l border-gray-800 pl-2">
                  {location.pathname.length > 2
                    ? location.pathname
                        .toString()
                        .substring(1, location.pathname.length - 1)
                    : "Dashboard"}
                </span>
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
