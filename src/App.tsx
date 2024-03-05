import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, useNavigate } from "react-router-dom";
import routes from "./routes/routes";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import supabase from "./config/supabase/supabase";
import { setIsLogin } from "./redux/Features/auth";
import { useAppDispatch } from "./redux/App/hooks";

function App() {
  const dispatch = useAppDispatch();
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const getSession = async () => {
    const session = await supabase.auth.getSession();
    console.log(session);

    if (session.data.session) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  };

  useEffect(() => {
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        console.log(session);
        if (session) {
          dispatch(setIsLogin(true));
        } else {
          dispatch(setIsLogin(false));
        }

        if (event === "SIGNED_OUT") {
          dispatch(setIsLogin(false));
          navigate("/");
        }
      }
    );

    return authListener.subscription.unsubscribe();
  }, []);
  return (
    <>
      {currentPath === "/dashboard" ? "" : <Nav />}
      <Routes>{routes.map((value) => value)}</Routes>
      {currentPath === "/dashboard" ? "" : <Footer />}
    </>
  );
}

export default App;
