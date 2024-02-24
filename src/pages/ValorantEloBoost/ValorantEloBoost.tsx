import React, { useEffect, useState } from "react";
import backgroundValElo from "./../../assets/valorant-eloboost-bg.jpg";
import { Link, useLocation } from "react-router-dom";
import { ImParagraphLeft } from "react-icons/im";
import { IoPeopleSharp } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { FaGreaterThan } from "react-icons/fa";
import supabase from "../../config/supabase/supabase";
import { RiSecurePaymentLine } from "react-icons/ri";
import {
  disabledBronze,
  disabledIron,
  disabledSilver,
} from "../../utils/disabledRank";

interface Service {
  id: number;
  price: number;
  division: string;
  service_id: number;
}

interface GamesService {
  id: number;
  game_id: number;
  rank: string;
  rank_image: string;
  service: Service[];
}

const ValorantEloBoost = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const [ranks, setRanks] = useState<GamesService[]>([]);
  const [selectedRank, setSelectedRank] = useState({
    rank_image:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-sssssssssssssss.webp",
    rank: "Gold",
  });
  const [selectedDivision, setSelectedDivision] = useState<string>("1");
  const [selectedTargetRank, setSelectedTargetRank] = useState({
    rank_image:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp",
    rank: "Platinum",
  });
  const [selectedTargetDivision, setSelectedTargetDivision] =
    useState<string>("1");
  const [currentRR, setCurrentRR] = useState<string>("0-25RR");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  console.log(
    selectedRank.rank === "Silver" ||
      selectedRank.rank === "Gold" ||
      selectedRank.rank === "Platinum" ||
      selectedRank.rank === "Diamond" ||
      selectedRank.rank === "Ascendant" ||
      selectedRank.rank === "Immortal"
  );
  console.log(selectedTargetDivision);

  useEffect(() => {
    const rankList = async () => {
      try {
        let { data: games_services, error } = await supabase
          .from("games_services")
          .select("*, service:services_price(*)")
          .eq("game_id", 2)
          .order("id", { ascending: true });
        setRanks(games_services as GamesService[]);

        if (games_services) {
          setSelectedRank(games_services[3]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    rankList();
  }, []);

  // const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculatePrice = (
      currentRank: string,
      currentDivision: string,
      targetRank: string,
      targetDivision: string,
      currentRR: string
    ) => {
      let foundCurrent = false;
      let totalCost = 0;

      for (const rank of ranks) {
        for (const service of rank.service) {
          if (foundCurrent) {
            // setTotalCost((e) => e + service.price);
            totalCost += service.price;
            if (
              rank.rank === targetRank &&
              service.division === targetDivision
            ) {
              return setTotalPrice(totalCost);
            }
          }
          if (
            rank.rank === currentRank &&
            service.division === currentDivision
          ) {
            foundCurrent = true;
            if (currentRR === "26-50RR") {
              totalCost -= service.price * 0.2;
            } else if (currentRR === "51-75RR") {
              totalCost -= service.price * 0.3;
            } else if (currentRR === "76-100RR") {
              totalCost -= service.price * 0.4;
            }
          }
        }
      }
    };
    calculatePrice(
      selectedRank.rank,
      selectedDivision,
      selectedTargetRank.rank,
      selectedTargetDivision,
      currentRR
    );
  }, [
    selectedDivision,
    selectedRank,
    selectedTargetDivision,
    selectedTargetRank,
    currentRR,
  ]);

  const formattedPrice: number = parseFloat(totalPrice.toFixed(2));
  const trapPrice: number = parseFloat(
    (formattedPrice + formattedPrice * 0.1).toFixed(2)
  );
  const discountedPrice: number = parseInt(
    (trapPrice - trapPrice * 0.2).toFixed(0),
    10
  );

  return (
    <div className="bg-backgroundSecondary  h-auto w-full ">
      <div className="w-full h-[400px] ">
        <img
          src={backgroundValElo}
          className="w-full h-full object-cover "
          alt=""
        />
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
      <div className="px-[200px] py-[50px] h-auto flex gap-7 ">
        <div className="left w-[70%] border-button border-opacity-40 rounded-xl border  h-full  flex">
          {/* CURRENT BANG */}
          <div className="w-[50%] h-full p-[30px]">
            <div className="flex gap-3  items-center ">
              <img
                src={selectedRank?.rank_image}
                className="w-[75px] h-[75px] bg-[#C4C4C4] rounded-xl"
              ></img>
              <div className="text-white">
                <h1 className="font-bold text-highlight">CURRENT RANK</h1>
                <p className="font-bold  text-white text-[24px]">
                  {selectedRank.rank + " " + selectedDivision}
                </p>
              </div>
            </div>
            <h1 className="mt-[50px] text-highlight">CHOOSE CURRENT RANK</h1>

            <div className=" flex gap-3 mt-[20px] flex-wrap">
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Iron"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-iron.webp",
                    rank: "Iron",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-iron.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Bronze"
                    ? "bg-white border rounded-xl"
                    : ""
                } `}
                onClick={() => {
                  if (selectedTargetRank.rank === "Iron") {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp",
                      rank: "Bronze",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp",
                    rank: "Bronze",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px]  ${
                  selectedRank.rank === "Silver"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  if (
                    selectedTargetRank.rank === "Iron" ||
                    selectedTargetRank.rank === "Bronze"
                  ) {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp",
                      rank: "Silver",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp",
                    rank: "Silver",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Gold"
                    ? "bg-white border rounded-xl"
                    : ""
                } `}
                onClick={() => {
                  if (
                    selectedTargetRank.rank === "Iron" ||
                    selectedTargetRank.rank === "Bronze" ||
                    selectedTargetRank.rank === "Silver"
                  ) {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp",
                      rank: "Gold",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp",
                    rank: "Gold",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Platinum"
                    ? "bg-white border rounded-xl"
                    : ""
                } `}
                onClick={() => {
                  if (
                    selectedTargetRank.rank === "Iron" ||
                    selectedTargetRank.rank === "Bronze" ||
                    selectedTargetRank.rank === "Silver" ||
                    selectedTargetRank.rank === "Gold"
                  ) {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp",
                      rank: "Platinum",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp",
                    rank: "Platinum",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px]  ${
                  selectedRank.rank === "Diamond"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  if (
                    selectedTargetRank.rank === "Iron" ||
                    selectedTargetRank.rank === "Bronze" ||
                    selectedTargetRank.rank === "Silver" ||
                    selectedTargetRank.rank === "Gold" ||
                    selectedTargetRank.rank === "Platinum"
                  ) {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp",
                      rank: "Diamond",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp",
                    rank: "Diamond",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Ascendant"
                    ? "bg-white border rounded-xl"
                    : ""
                } `}
                onClick={() => {
                  if (
                    selectedTargetRank.rank === "Iron" ||
                    selectedTargetRank.rank === "Bronze" ||
                    selectedTargetRank.rank === "Silver" ||
                    selectedTargetRank.rank === "Gold" ||
                    selectedTargetRank.rank === "Platinum" ||
                    selectedTargetRank.rank === "Diamond"
                  ) {
                    setSelectedTargetRank({
                      rank_image:
                        "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp",
                      rank: "Ascendant",
                    });
                  }
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp",
                    rank: "Ascendant",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
              <div
                className={`w-[75px] h-[75px] ${
                  selectedRank.rank === "Immortal"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp",
                    rank: "Immortal",
                  });
                  setSelectedRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp",
                    rank: "Immortal",
                  });
                }}
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl cursor-pointer"
                ></img>
              </div>
            </div>
            <h1 className="mt-[50px] text-highlight">
              CHOOSE CURRENT DIVISION
            </h1>
            <div className=" flex gap-3 mt-[20px] flex-wrap">
              <div
                className={`w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4] cursor-pointer ${
                  selectedDivision === "1" ? "bg-white border rounded-xl" : ""
                }`}
                onClick={() => setSelectedDivision("1")}
              >
                I
              </div>
              <div
                className={`w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4] cursor-pointer ${
                  selectedDivision === "2" ? "bg-white border rounded-xl" : ""
                }`}
                onClick={() => {
                  if (
                    (selectedRank.rank === selectedTargetRank.rank &&
                      selectedDivision === "2") ||
                    selectedDivision === "1"
                  ) {
                    setSelectedTargetDivision("3");
                  }
                  setSelectedDivision("2");
                }}
              >
                II
              </div>
              <div
                className={`w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4] cursor-pointer ${
                  selectedDivision === "3" ? "bg-white border rounded-xl" : ""
                }`}
                onClick={() => setSelectedDivision("3")}
              >
                III
              </div>
            </div>
            <div className="flex flex-col mt-[20px]">
              <label htmlFor="currentRR" className="text-highlight">
                CURRENT RR :
              </label>
              <select
                className="bg-button bg-opacity-10 mt-[20px] rounded-md w-[50%] text-secondary"
                id="currentRR"
                name="currentRR"
                onChange={(e) => setCurrentRR(e.target.value)}
              >
                <option selected value="0-25RR">
                  0-25
                </option>
                <option value="26-50RR">26-50</option>
                <option value="51-75RR">51-75</option>
                <option value="76-100RR">76-100</option>
              </select>
            </div>
          </div>
          {/* TARGET BANG */}
          <div className="w-[50%] h-full p-[30px]">
            <div className="flex gap-3  items-center ">
              <img
                src={selectedTargetRank?.rank_image}
                className="w-[75px] h-[75px] bg-[#C4C4C4] rounded-xl"
              ></img>
              <div className="text-white">
                <h1 className="font-bold text-highlight">TARGET RANK</h1>
                <p className="font-bold  text-white text-[24px]">
                  {selectedTargetRank.rank + " " + selectedTargetDivision}
                </p>
              </div>
            </div>
            <h1 className="mt-[50px] text-highlight">CHOOSE TARGET RANK</h1>
            <div className=" flex gap-3 mt-[20px] flex-wrap">
              <button
                disabled={
                  selectedRank.rank === "Bronze" ||
                  selectedRank.rank === "Silver" ||
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`${disabledIron(
                  selectedRank.rank
                )} w-[75px] h-[75px] ${
                  selectedTargetRank.rank === "Iron"
                    ? "bg-white border rounded-xl "
                    : ""
                } ${
                  selectedRank.rank === "Bronze" ||
                  selectedRank.rank === "Silver" ||
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-iron.webp",
                    rank: "Iron",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-iron.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                disabled={
                  selectedRank.rank === "Silver" ||
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`${disabledBronze(
                  selectedRank.rank
                )} w-[75px] h-[75px] ${
                  selectedTargetRank.rank === "Bronze"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Silver" ||
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                } `}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp",
                    rank: "Bronze",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                disabled={
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`w-[75px] h-[75px]  ${disabledSilver(
                  selectedRank.rank
                )} ${
                  selectedTargetRank.rank === "Silver"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Gold" ||
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp",
                    rank: "Silver",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                disabled={
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`w-[75px] h-[75px] ${
                  selectedTargetRank.rank === "Gold"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Platinum" ||
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp",
                    rank: "Gold",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                disabled={
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`w-[75px] h-[75px] ${
                  selectedTargetRank.rank === "Platinum"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Diamond" ||
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp",
                    rank: "Platinum",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                disabled={
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? true
                    : false
                }
                className={`w-[75px] h-[75px]  ${
                  selectedTargetRank.rank === "Diamond"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Ascendant" ||
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp",
                    rank: "Diamond",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                className={`w-[75px] h-[75px] ${
                  selectedTargetRank.rank === "Ascendant"
                    ? "bg-white border rounded-xl"
                    : ""
                } ${
                  selectedRank.rank === "Immortal"
                    ? "bg-zinc-500/30  rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp",
                    rank: "Ascendant",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl "
                ></img>
              </button>
              <button
                className={`w-[75px] h-[75px]  ${
                  selectedTargetRank.rank === "Immortal"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTargetRank({
                    rank_image:
                      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp",
                    rank: "Immortal",
                  })
                }
              >
                <img
                  src="https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp"
                  className="w-[75px] h-[75px] border-[#c4c4c4c4] border rounded-xl   "
                ></img>
              </button>
            </div>
            <h1 className="mt-[50px] text-highlight">CHOOSE TARGET DIVISION</h1>
            <div className=" flex gap-3 mt-[20px] flex-wrap">
              <button
                disabled={
                  selectedRank.rank === selectedTargetRank.rank &&
                  selectedDivision === "1"
                    ? true
                    : false
                }
                className={`${
                  selectedRank.rank === selectedTargetRank.rank &&
                  (selectedDivision === "1" ||
                    selectedDivision === "2" ||
                    selectedDivision === "3")
                    ? "bg-zinc-500/30"
                    : ""
                }  w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4]  ${
                  selectedTargetDivision === "1"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTargetDivision("1");
                }}
              >
                I
              </button>
              <button
                className={`${
                  selectedRank.rank === selectedTargetRank.rank &&
                  (selectedDivision === "2" || selectedDivision === "3")
                    ? "bg-zinc-500/30"
                    : ""
                } w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4]  ${
                  selectedTargetDivision === "2"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTargetDivision("2");
                }}
              >
                II
              </button>
              <button
                className={`w-[75px] h-[40px] text-[#c4c4c4] rounded-xl flex justify-center items-center border border-[#c4c4c4c4] cursor-pointer ${
                  selectedTargetDivision === "3"
                    ? "bg-white border rounded-xl"
                    : ""
                }`}
                onClick={() => setSelectedTargetDivision("3")}
              >
                III
              </button>
            </div>
          </div>
        </div>
        <div className="right w-[30%] border-button border-opacity-40 rounded-xl border  h-full py-[20px]">
          <h1 className="text-center text-[18px] text-white font-bold mb-[20px]">
            Solo Division Boost
          </h1>
          <div className="flex h-auto py-[20px] bg-slate-700">
            <div className="w-[33%] flex flex-col items-center gap-3">
              <img
                src={selectedRank.rank_image}
                className="w-[50px] h-[50px]"
                alt=""
              />
              <h1 className="text-white font-bold text-[14px]">
                {selectedRank.rank.toLocaleUpperCase() + " " + selectedDivision}
              </h1>
            </div>
            <div className="w-[33%]  items-center flex justify-center">
              <div className="bg-button p-2 rounded-full">
                <FaGreaterThan className="text-white text-[12px]" />
              </div>
            </div>
            <div className="w-[33%] flex flex-col items-center gap-3">
              <img
                src={selectedTargetRank.rank_image}
                className="w-[50px] h-[50px]"
                alt=""
              />
              <h1 className="text-white font-bold text-[14px]">
                {selectedTargetRank.rank.toLocaleUpperCase() +
                  " " +
                  selectedTargetDivision}
              </h1>
            </div>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">Priority Order</h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                +20%
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">Live Stream</h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                +20%
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">Solo Only</h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                +40%
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">No 5 Stack</h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                +25%
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">Extra Win</h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                +5$
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white flex items-center justify-between pt-[20px] px-[10px]">
            <div className="flex items-center ">
              <h1 className="mr-[5px]">Offline Chat </h1>
              <h1 className="px-[4px] py-[8px] text-[12px] bg-button rounded-xl bg-opacity-20 font-bold">
                FREE
              </h1>
            </div>
            <label className="inline-flex items-center cursor-pointer ">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white   after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="text-white font-bold px-[10px] pt-[30px]  flex justify-between items-center">
            <h1 className="">Total Price</h1>
            <div className="flex items-center gap-3">
              <h1 className="text-highlight text-[32px]">{`$${discountedPrice}`}</h1>
              <h1 className="line-through text-secondary">
                {`$ ${trapPrice}`}
              </h1>
            </div>
          </div>
          <h1 className="text-center my-[10px] text-button">
            10% Discount Applied
          </h1>
          <div className="px-[10px]">
            <button className="w-full bg-button text-white py-[10px] rounded-xl">
              Checkout Now
            </button>
          </div>
          <div className="flex px-[10px] justify-center items-center gap-3 mt-[20px]">
            <RiSecurePaymentLine className="text-[32px] text-highlight" />
            <h1 className="font-bold text-[18px] text-white">
              Safe and Secure Payments
            </h1>
          </div>
          <h1 className="text-center text-white">
            100% secure checkout powered by Stripe
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ValorantEloBoost;
