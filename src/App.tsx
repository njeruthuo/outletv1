import React from "react";
import { SignInForm } from "./pages/auth/forms";
import AuthLayout from "./pages/auth/AuthLayout";
import { Toaster } from "./components/ui/toaster";
import MainLayout from "./pages/others/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sales, Stock, Reports, Home, Settings } from "./pages";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/sales/" element={<Sales />} />
            <Route path="/stock/" element={<Stock />} />
            <Route path="/reports/" element={<Reports />} />
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
