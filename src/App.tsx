import React from "react";
import { PosXSales } from "./pages/sales";
import { SignInForm } from "./pages/auth/forms";
import { Toaster } from "./components/ui/toaster";
import { Stock, Reports, Home, Settings } from "./pages";
import { AuthLayout, MainLayout } from "./pages/layouts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/stock/" element={<Stock />} />
            <Route path="/reports/" element={<Reports />} />
            <Route path="/sales/" element={<PosXSales />} />
            <Route path="/settings/" element={<Settings />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="sign-in/" element={<SignInForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </React.Fragment>
  );
};
export default App;
