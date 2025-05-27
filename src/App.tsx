import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Routes,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import routes from "./routes/routes";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import supabase from "./config/supabase/supabase";
import { setIsLogin } from "./redux/Features/auth";
import { useAppDispatch } from "./redux/App/hooks";
import { toastError } from "./utils/toast";

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

  return (
    <>
      {currentPath === "/dashboard" ||
      currentPath === "/order" ||
      currentPath === "/booster/orders" ||
      currentPath === urlParam2 ||
      currentPath === urlParam ? (
        ""
      ) : (
        <Nav />
      )}
      <Routes>{routes.map((value) => value)}</Routes>
      {currentPath === "/dashboard" ||
      currentPath === "/order" ||
      currentPath === "/booster/orders" ||
      currentPath === urlParam2 ||
      currentPath === urlParam ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
}

export default App;
