import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/others/employee";
import MainLayout from "./pages/others/MainLayout";
import { SignInForm } from "./pages/auth/forms";
import AuthLayout from "./pages/auth/AuthLayout";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="sign-in" element={<SignInForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default App;
