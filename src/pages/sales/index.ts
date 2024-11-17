import PosXSales from "./PosXSales";
import Checkout from "./point-of-sale/Checkout";
export { PosXSales,Checkout };

export interface State {
  auth?: {
    isLoggedIn: boolean;
    salesMode: boolean;
  };
}
