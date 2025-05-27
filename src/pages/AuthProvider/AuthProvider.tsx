import React, { useEffect, useState, ReactNode, useContext } from "react";
import supabase from "../../config/supabase/supabase";
import { setIsLogin, setUserData } from "../../redux/Features/auth";
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
      const user = session?.user;
      console.log("session", session);
      
      if (session) {
        dispatch(setIsLogin(true));
      } else {
        dispatch(setIsLogin(false));
      }

      if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
        Cookies.set("token", session?.access_token || "");

        if (user) {
          dispatch(
            setUserData({
              id: user?.id,
              email: user?.email,
              fullname: user?.user_metadata.full_name,
              avatar_url: user?.user_metadata?.avatar_url,
            })
          );
        }
      }

      if (event === "SIGNED_OUT") {
        toastSuccess("Logout Success!");
        navigate("/");
        dispatch(setUserData(null))
        Cookies.remove("token");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
