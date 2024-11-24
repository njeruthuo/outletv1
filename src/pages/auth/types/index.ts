export interface InitialState {
  isLoggedIn: boolean;
  token: string;
  salesMode: boolean;
  access_level?: "Admin" | "Employee" | "Manager" | "";
}
