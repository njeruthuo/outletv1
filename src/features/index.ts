import { authApi } from "./auth/authApi";
import { salesAPI } from "./sales/salesAPI";
import AuthReducer from "./auth/AuthSlice";
import { reportApi } from "./reports/reportApi";
import saleSliceReducer from "./sales/saleSlice";
import { dashboardApi } from "./dashboard/dashboard";
import { notificationsApi } from "./notifications/notificationsApi";
import reportReducer from './reports/reportSlice';

export {
  dashboardApi,
  AuthReducer,
  authApi,
  notificationsApi,
  saleSliceReducer,
  salesAPI,
  reportApi,
  reportReducer,
};
