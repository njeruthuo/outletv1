import PosXSales from "./PosXSales";
export { PosXSales };

export interface State {
  auth?: {
    isLoggedIn: boolean;
    salesMode: boolean;
  };
}
