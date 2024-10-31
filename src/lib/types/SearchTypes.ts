export enum SearchContext {
  Home = "HOME",
  Products = "PRODUCTS",
  Orders = "ORDERS",
  Customers = "CUSTOMERS",
  Reports = "REPORTS",
}

export interface SearchBarProps {
  context: SearchContext;
  setFunc?: any;
}
