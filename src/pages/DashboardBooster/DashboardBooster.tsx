import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import supabase from "../../config/supabase/supabase";

import Cookies from "js-cookie";
// import { SocketContext } from "../../context/socket";

interface MyComponentProps {
  children: ReactNode;
}

const DashboardBooster: React.FC<MyComponentProps> = ({ children }) => {
  const currentPath = window.location.pathname;

  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   // socket.connect();
  //   socket.on("session", ({ sessionID }) => {
  //     socket.auth = { sessionID };
  //     Cookies.set("session", sessionID);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="h-screen   bg-backgroundSecondary flex ">
      <div className="w-[200px] h-full fixed   bg-backgroundSecondary  border-r-[2px] border-r-backgroundLow shadow-xl py-[50px] flex flex-col justify-between">
        <div>
          <Link to={"/"}>
            <h1 className={` text-center font-bold text-[24px] text-button `}>
              BOOSTINGELO
            </h1>
          </Link>
        </div>
        <div className="mt-[-200px]">
          <Link to={"/booster/orders"}>
            <div
              className={` ${
                currentPath === "/booster/orders"
                  ? "text-button"
                  : "text-secondary"
              } py-4 px-[10px] hover:bg-slate-700  w-full flex justify-start items-center gap-5  cursor-pointer`}
            >
              <FaHome className="text-[18px]" />
              <h1>Orders</h1>
            </div>
          </Link>
          <div className="py-4 px-[10px] hover:bg-slate-700 text-secondary w-full flex justify-start items-center gap-5  cursor-pointer">
            <FaGear className="text-[18px]" />
            <h1>Profile Settings</h1>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="rounded-full w-[50px] h-[50px] cursor-pointer bg-backgroundLow flex justify-center items-center">
            <ImExit className="text-[18px] text-slate-300" />
          </div>
        </div>
      </div>
      <div className="p-[50px] w-full h-auto ml-[200px] ">{children}</div>
    </div>
  );
};

export default DashboardBooster;
