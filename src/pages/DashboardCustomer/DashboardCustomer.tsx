import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

interface MyComponentProps {
  children: ReactNode;
}

const DashboardCustomer: React.FC<MyComponentProps> = ({ children }) => {
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen   bg-backgroundSecondary flex ">
      <div className="w-[200px] h-full  bg-backgroundSecondary  border-r-[2px] border-r-backgroundLow shadow-xl py-[50px] flex flex-col justify-between">
        <div>
          <Link to={"/"}>
            <h1 className={` text-center font-bold text-[24px] text-button `}>
              BOOSTINGELO
            </h1>
          </Link>
          <div className="flex flex-col justify-center items-center mt-[100px]">
            <div className="rounded-full w-[75px] h-[75px] cursor-pointer bg-slate-700 "></div>
          </div>
        </div>
        <div className="mt-[-200px]">
          <Link to={"/dashboard"}>
            <div
              className={` ${
                currentPath === "/dashboard" ? "text-button" : "text-secondary"
              } py-4 px-[10px] hover:bg-slate-700  w-full flex justify-start items-center gap-5  cursor-pointer`}
            >
              <FaHome className="text-[18px]" />
              <h1>Dashboard</h1>
            </div>
          </Link>
          <Link to={"/order"}>
            <div
              className={` ${
                currentPath === "/order" ? "text-button" : "text-secondary"
              } py-4 px-[10px] hover:bg-slate-700  w-full flex justify-start items-center gap-5  cursor-pointer`}
            >
              <FaShoppingCart className="text-[18px]" />
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
      <div className="p-[50px] w-full h-screen  ">{children}</div>
    </div>
  );
};

export default DashboardCustomer;
