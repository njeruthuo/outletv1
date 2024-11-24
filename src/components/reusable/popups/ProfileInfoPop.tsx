import { BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { logout } from "@/pages/auth/reducers/AuthSlice";
import { useDispatch } from "react-redux";

const ProfileInfoPop = () => {
  const dispatch = useDispatch();
  const [switchOpen, setSwitchOpen] = useState(false);
  const handleSwitch = () => {
    setSwitchOpen((prev: boolean) => !prev);
    dispatch(logout());
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>My profile</CardTitle>
          <CardDescription>
            Manage all your personal settings here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Log out</p>
              <p className="text-sm text-muted-foreground">
                You will be able to log in again.
              </p>
            </div>
            <Switch
              className={`${
                switchOpen ? "bg-custom1" : "bg-gray-300"
              } transition-colors duration-200`}
              checked={switchOpen}
              onCheckedChange={handleSwitch}
            />
          </div>
        </CardContent>
        {/* <CardFooter className="flex justify-between place-items-center">
          <GlobalCloseButton>Cancel</GlobalCloseButton>
          <GlobalSubmitButton>Deploy</GlobalSubmitButton>
        </CardFooter> */}
      </Card>
    </div>
  );
};
export default ProfileInfoPop;
