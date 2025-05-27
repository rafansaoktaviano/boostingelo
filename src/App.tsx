import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Routes,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import supabase from "./config/supabase/supabase";
import { setIsLogin } from "./redux/Features/auth";
import { useAppDispatch } from "./redux/App/hooks";
import { toastError } from "./utils/toast";
import AppRoutes from "./routes/routes";

function App() {
  const dispatch = useAppDispatch();
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const urlParam = useMatch("/order/:id")?.pathname;
  const urlParam2 = useMatch("/booster/orders/:id")?.pathname;

  const originalWarn = console.warn;

  console.warn = (...args) => {
    const [firstArg] = args;
    if (
      typeof firstArg === "string" &&
      firstArg.includes(
        "An aria-label or aria-labelledby prop is required for accessibility."
      )
    ) {
      return;
    }

    originalWarn(...args);
  };

  const isDashboardPage =
    currentPath === "/dashboard" ||
    currentPath === "/order" ||
    currentPath === "/booster/orders" ||
    currentPath === urlParam ||
    currentPath === urlParam2;

  return (
    <>
      {!isDashboardPage && <Nav />}
      <AppRoutes />
      {!isDashboardPage && <Footer />}
    </>
  );
}

export default App;
