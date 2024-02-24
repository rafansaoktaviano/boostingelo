import React from "react";
import { Link, useLocation } from "react-router-dom";
import valorantDuo from "./../../assets/valorant-duoboost.jpg";
import { ImParagraphLeft } from "react-icons/im";
import { IoPeopleSharp } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { PiAirplaneInFlightFill } from "react-icons/pi";
const ValorantDuoBoost = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <div className="bg-backgroundSecondary  h-screen w-full ">
      <div className="w-full h-[400px] ">
        <img src={valorantDuo} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-full h-[60px] bg-slate-700 flex justify-center items-center gap-10">
        <div className="gradient-overlay2"></div>
        <Link to={"/valorant/elo-boost"}>
          <button
            className={`${
              currentLocation === "/valorant/elo-boost"
                ? "bg-button"
                : "bg-button bg-opacity-10 hover:bg-opacity-80"
            } py-[10px] px-[30px] text-white    font-bold rounded-lg cursor-pointer flex justify-center items-center gap-3 transition-colors duration-500`}
          >
            <ImParagraphLeft className="text-[18px]" /> Elo Boost
          </button>
        </Link>
        <Link to={"/valorant/duo-boost"}>
          <button
            className={`${
              currentLocation === "/valorant/duo-boost"
                ? "bg-button"
                : "bg-button bg-opacity-10 hover:bg-opacity-80"
            } py-[10px] px-[20px] text-white   font-bold rounded-lg cursor-pointer flex justify-center items-center gap-3 transition-colors duration-500`}
          >
            <IoPeopleSharp className="text-[18px]" /> Duo Boost
          </button>
        </Link>
        <Link to={"/valorant/win-boost"}>
          <button
            className={`${
              currentLocation === "/valorant/win-boost"
                ? "bg-button"
                : "bg-button bg-opacity-10 hover:bg-opacity-80"
            } py-[10px] px-[20px] text-white   font-bold rounded-lg cursor-pointer flex justify-center items-center gap-3 transition-colors duration-500`}
          >
            <RiComputerFill className="text-[18px]" /> Win Boost
          </button>
        </Link>
        <Link to={"/valorant/placement-boost"}>
          <button
            className={`${
              currentLocation === "/valorant/placement-boost"
                ? "bg-button"
                : "bg-button bg-opacity-10 hover:bg-opacity-80"
            } py-[10px] px-[20px] text-white   font-bold rounded-lg cursor-pointer flex justify-center items-center gap-3 transition-colors duration-500`}
          >
            <PiAirplaneInFlightFill className="text-[18px]" /> Placement Boost
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ValorantDuoBoost;
