import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/others/employee";
import MainLayout from "./pages/others/MainLayout";
import { SignInForm } from "./pages/auth/forms";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          {/* <Route> */}
          <Route path="sign-in" element={<SignInForm />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default App;
