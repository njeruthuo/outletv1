import { Sidebar } from "@/components/custom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toggleSalesMode } from "../auth/reducers/AuthSlice";
import { State } from "../sales";
import GlobalPopOver from "@/components/reusable/GlobalPopOver";
import ProfileInfoPop from "@/components/reusable/popups/ProfileInfoPop";

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const switchMode = () => dispatch(toggleSalesMode());

  const auth = useSelector((state: State) => state?.auth);

  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const hideMenu = () => setShowSideMenu((prev: boolean) => !prev);

  return (
    <div className="flex h-screen w-full place-items-center">
      {auth?.isLoggedIn ? (
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
                />{" "}
                <span className=" pl-2">
                  {location.pathname.length > 2
                    ? location.pathname.split("/")[1]
                    : "Dashboard"}
                </span>
                <div className="mr-3 ml-auto flex gap-4">
                  {location.pathname.toString().includes("sales") && (
                    <div>
                      <div className=" flex gap-2 place-items-center">
                        <span>Sales Mode</span>
                        <Switch
                          style={{
                            backgroundColor: auth.salesMode
                              ? "#00AF54"
                              : "#905C3F",
                          }}
                          checked={auth.salesMode}
                          onCheckedChange={switchMode}
                        />{" "}
                      </div>
                    </div>
                  )}

                  <div className="hover:cursor-pointer">
                    <GlobalPopOver
                      children={<ProfileInfoPop />}
                      trigger={<img src="/account_circle.svg" className="h-6" alt="" />}
                      contentClassName="w-full"
                    />
                  </div>
                </div>
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
