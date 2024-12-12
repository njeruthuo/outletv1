import React from "react";
import { Switch } from "@/components/ui/switch";
import { GlobalSwitchType } from ".";

const GlobalSwitch: React.FC<GlobalSwitchType> = ({
  checked,
  onCheckedChange,
}) => {
  return (
    <>
      <Switch
        style={{
          backgroundColor: checked ? "#00AF54" : "#905C3F",
        }}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </>
  );
};

export default GlobalSwitch;
