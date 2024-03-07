import React, { useEffect, useState, ReactNode, useContext } from "react";
import supabase from "../../config/supabase/supabase";
import { setIsLogin } from "../../redux/Features/auth";
import { useAppDispatch } from "../../redux/App/hooks";
import { useNavigate } from "react-router-dom";
import { createContext } from "vm";
import { toastError, toastSuccess } from "../../utils/toast";
import Cookies from "js-cookie";

interface MyComponentProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(session);

      if (event === "TOKEN_REFRESHED") {
        Cookies.set("token", session?.access_token || "");
      }
      if (session) {
        dispatch(setIsLogin(true));
      } else {
        dispatch(setIsLogin(false));
      }
      if (event === "SIGNED_OUT") {
        toastSuccess("Logout Success!");
        navigate("/");
        Cookies.remove("token");
      }

      if (event === "SIGNED_IN") {
        Cookies.set("token", session?.access_token || "");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
