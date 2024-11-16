import { Sidebar } from "@/components/custom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toggleSalesMode } from "../auth/reducers/AuthSlice";
import { State } from "../sales";

const MainLayout = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const switchMode = () => dispatch(toggleSalesMode());

  const auth = useSelector((state: State) => state?.auth);

  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const hideMenu = () => setShowSideMenu((prev: boolean) => !prev);

  return (
    <div className="flex h-screen w-full ">
      {auth?.isLoggedIn ? (
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {showSideMenu && (
              <div className="w-72 bg-custom1 h-screen text-white">
                <Sidebar />
              </div>
            )}

            <div className="p-4 w-full">
              <div className="flex gap-2 mb-4 w-full">
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
                {location.pathname.toString().includes("sales") && (
                  <div className="ml-auto mr-3">
                    <div className=" flex gap-2 place-items-center">
                      <Switch
                        style={{
                          backgroundColor: auth.salesMode
                            ? "#00AF54"
                            : "#905C3F",
                        }}
                        checked={auth.salesMode}
                        onCheckedChange={switchMode}
                      />{" "}
                      <span>Sales Mode</span>
                    </div>
                  </div>
                )}
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
