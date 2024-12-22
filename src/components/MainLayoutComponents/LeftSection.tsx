import { RootState } from "@/store/store";
import { GlobalCard } from "../reusable/cards";
import { GlobalSwitch } from "../reusable/switch";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../reusable/popups/Notifications";
import GlobalPopOver from "@/components/reusable/GlobalPopOver";
import { toggleSalesMode } from "@/features/auth/AuthSlice";
import ProfileInfoPop from "@/components/reusable/popups/ProfileInfoPop";

const LeftSection = () => {
  const dispatch = useDispatch();
  const switchMode = () => dispatch(toggleSalesMode());
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div className="mr-3 ml-auto flex gap-4">
      {location.pathname.toString().includes("sales") &&
        auth.access_level !== "Employee" && (
          <div>
            <div className=" flex gap-2 place-items-center">
              <span>Sales Mode</span>
              <GlobalSwitch
                checked={auth.salesMode}
                onCheckedChange={switchMode}
              />
            </div>
          </div>
        )}

      <div className="hover:cursor-pointer">
        <GlobalPopOver
          children={
            <GlobalCard
              title={<h2>Notifications</h2>}
              description={<h2>Find all notifications here</h2>}
              content={<Notifications />}
            />
          }
          trigger={<img src="/notifications.svg" className="h-6" alt="" />}
          contentClassName="w-full"
        />
      </div>

      <div className="hover:cursor-pointer">
        <GlobalPopOver
          children={
            <GlobalCard
              title={<h2>My profile</h2>}
              description={<h2>Manage all your personal settings here.</h2>}
              content={<ProfileInfoPop />}
            />
          }
          trigger={<img src="/account_circle.svg" className="h-6" alt="" />}
          contentClassName="w-full"
        />
      </div>
    </div>
  );
};

export default LeftSection;
