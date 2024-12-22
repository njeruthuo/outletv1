import { useState } from "react";
import { GlobalSwitch } from "../switch";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/AuthSlice";

const ProfileInfoPop = () => {
  const dispatch = useDispatch();
  const [switchOpen, setSwitchOpen] = useState(false);
  const handleSwitch = () => {
    setSwitchOpen((prev: boolean) => !prev);
    dispatch(logout());
  };

  return (
    <div>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Log out</p>
          <p className="text-sm text-muted-foreground">
            You will be able to log in again.
          </p>
        </div>
        <GlobalSwitch checked={switchOpen} onCheckedChange={handleSwitch} />
      </div>
    </div>
  );
};
export default ProfileInfoPop;
