import React, { useEffect, useState, ReactNode, useContext } from "react";
import supabase from "../../config/supabase/supabase";
import { setIsLogin, setRole, setUserData } from "../../redux/Features/auth";
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
    async function fetchInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      let { data: dataRole, error: error } = await supabase
        .from("users_details")
        .select("role")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        console.error("Error fetching role:", error);
        dispatch(setRole("customer"));
      } else {
        dispatch(setRole(dataRole?.role || null));
        dispatch(setIsLogin(true));
      }
    }

    fetchInitialSession();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user;
      console.log("session", session);

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

      if (session) {
        dispatch(setIsLogin(true));
      } else {
        dispatch(setRole("customer"));
        dispatch(setIsLogin(false));
      }

      if (event === "SIGNED_OUT") {
        toastSuccess("Logout Success!");
        navigate("/");
        dispatch(setUserData(null));
        Cookies.remove("token");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
