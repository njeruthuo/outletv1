import GlobalSwitch from "./GlobalSwitch";

export { GlobalSwitch };

export type GlobalSwitchType = {
  checked: boolean;
  onCheckedChange: (arg?: boolean | undefined) => void;
};
