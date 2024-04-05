import React, { useEffect, useState } from "react";
import supabase from "../../config/supabase/supabase";
import { toastError } from "../../utils/toast";

import { CiStreamOn } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import PopOver from "../../components/PopOver/PopOver";

import { Link } from "react-router-dom";

import valorantlogo from "./../../assets/valorantlogo.png";
import dotalogo from "./../../assets/dota2logo.png";
import lollogo from "./../../assets/lollogo.png";
import tftlogo from "./../../assets/TFTlogo.png";

type SupabaseSession = import("@supabase/supabase-js").Session | null;

export interface Orders {
  id: number;
  status: string;
  booster: string | null;
  game_id: number;
  region: string;
  order_id: number;
  price: number;
  created_at: string;
  type_order: string;
  orders_details: OrdersDetail[];
}

export interface OrdersDetail {
  stream: boolean;
  end_rank: string;
  no_stack: boolean | null;
  priority: boolean;
  win_match: number;
  start_rank: string;
  rank_rating: number;
  end_division: string;
  offline_chat: boolean;
  type_service: string;
  start_division: string;
}

const columns = [
  { name: "Game", uid: "game_id" },
  { name: "ID", uid: "order_id" },
  { name: "Rank", uid: "orders_details" },
  { name: "Region", uid: "region" },
  { name: "Details", uid: "details" },
  { name: "Price", uid: "price" },
  { name: "Actions", uid: "actions" },
];

const OrderBoosterPage = () => {
  const [data, setData] = useState<Orders[]>([]);
  const [sessionData, setSessionData] = useState<SupabaseSession | null>(null);
  const fetch = async () => {
    const { data: session, error: errorSession } =
      await supabase.auth.getSession();
    setSessionData(session.session);

    let { data: users_details, error: errorUserDetails } = await supabase
      .from("users_details")
      .select("*")
      .eq("id", session.session?.user.id)
      .single();

    console.log(users_details);

    if (errorUserDetails) return toastError("Error!");

    const boosterGame =
      users_details.role == "Booster Valorant"
        ? 2
        : users_details.role == "Booster League of Legends"
        ? 1
        : users_details.role == "Booster Dota 2"
        ? 4
        : users_details.role == "Booster Teamfight Tactics"
        ? 3
        : null;

    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, status, booster , game_id, region ,order_id, price, created_at, type_order, orders_details(start_rank ,start_division,end_rank,end_division,type_service, priority,stream ,rank_rating, no_stack, offline_chat, rank_rating, win_match)"
      )
      .or(`booster.is.null, booster.eq.${session.session?.user.id}`)
      .or(
        `status.eq.${"Waiting For Booster"}, status.eq.${"Order In Proggress"}`
      )
      .or(`game_id.eq.${boosterGame}`)
      .order("created_at", { ascending: false });
    console.log(data);
    console.log(error);

    if (error) return toastError("Error!");

    setData(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredBooster = data.filter((value) => {
    return value.booster !== null;
  });
  const filteredNotBooster = data.filter((value) => {
    return value.booster === null;
  });

  const renderCell = React.useCallback(
    (orders: Record<string, any>, columnKey: any) => {
      const cellValue = orders[columnKey];

      switch (columnKey) {
        case "game_id":
          return cellValue === 1 ? (
            <div className="w-full h-full  flex justify-start items-center">
              <div className="w-[50px] rounded-full h-[50px] flex justify-center items-center bg-button/10">
                <div className="w-[50px] scale-150 rounded-full h-[50px] flex justify-center items-center">
                  <img src={lollogo} alt="" />
                </div>
              </div>
            </div>
          ) : cellValue === 2 ? (
            <div className="w-full h-full  flex justify-start items-center">
              <div className="w-[50px] rounded-full h-[50px] flex justify-center items-center bg-button/10">
                <div className="w-[50px] scale-120 rounded-full h-[50px] flex justify-center items-center">
                  <img src={valorantlogo} alt="" />
                </div>
              </div>
            </div>
          ) : cellValue === 3 ? (
            <div className="w-full h-full  flex justify-start items-center">
              <div className="w-[50px] rounded-full h-[50px] flex justify-center items-center bg-button/10">
                <div className="w-[50px] scale-150 rounded-full h-[50px] flex justify-center items-center">
                  <img src={tftlogo} alt="" />
                </div>
              </div>
            </div>
          ) : cellValue === 4 ? (
            <div className="w-full h-full  flex justify-start items-center">
              <div className="w-[50px] rounded-full h-[50px] flex justify-center items-center bg-button/10">
                <div className="w-[50px] scale-150 rounded-full h-[50px] flex justify-center items-center">
                  <img src={dotalogo} alt="" />
                </div>
              </div>
            </div>
          ) : (
            ""
          );
        case "order_id":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {"#" + cellValue.toString().padStart(5, "0")}
              </p>
            </div>
          );
        case "orders_details":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {cellValue?.map((value: OrdersDetail, index: number) => {
                  return (
                    <div key={index}>{`${value.start_rank} ${
                      value.start_division
                    } ${
                      value.rank_rating === 0
                        ? "0-25RR"
                        : value.rank_rating === 26
                        ? "26-50RR"
                        : value.rank_rating === 51
                        ? "51-75"
                        : value.rank_rating === 76
                        ? "76-100RR"
                        : ""
                    } - ${value.end_rank} ${value.end_division} | ${
                      orders.type_order
                    } `}</div>
                  );
                })}
              </p>
            </div>
          );
        case "region":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {cellValue}
              </p>
            </div>
          );
        case "details":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {orders.orders_details.map(
                  (value: OrdersDetail, index: number) => {
                    return (
                      <>
                        <div className="flex gap-2 justify-center items-center text-[12px] ">
                          {value.priority === true ? (
                            <PopOver text="Duo Boost" style="bg-button">
                              <FaRocket className="text-[32px] text-button  font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}
                          {value.stream === true ? (
                            <PopOver text="Stream" style="bg-purple-500">
                              <CiStreamOn className="text-[32px] text-purple-400 font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}
                          {value.offline_chat === true ? (
                            <PopOver text="Offline Chat" style="bg-slate-700">
                              <IoChatbox className="text-[32px] text-slate-500  font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}
                          {value.type_service === "Solo Boost" ? (
                            <PopOver text="Solo Boost" style="bg-highlight">
                              <BsPersonFill className="text-[32px] text-highlight  font-bold" />
                            </PopOver>
                          ) : value.type_service === "Duo Boost" ? (
                            <PopOver text="Duo Boost" style="bg-highlight">
                              <IoMdPeople className="text-[32px] text-highlight  font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}
                          {value.win_match > 0 ? (
                            <PopOver
                              text={`+ ${value.win_match} WIN`}
                              style="bg-yellow-600"
                            >
                              <FaPlus className="text-[32px] text-yellow-600  font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}

                          {value.no_stack === true ? (
                            <PopOver text="No 5 Stack" style="bg-red-500">
                              <MdError className="text-[32px] text-red-500  font-bold" />
                            </PopOver>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    );
                  }
                )}
              </p>
            </div>
          );
        case "price":
          return <div className="text-white text-start">{`$${cellValue * .5}`}</div>;
        case "actions":
          return orders.booster == sessionData?.user.id ? (
            <div className="flex gap-2 justify-start items-center font-bold ">
              <div className="hover:bg-red-500 px-5 cursor-pointer  text-[16px] text-red-500 bg-red-500/20 transform duration-300 hover:text-white  rounded-2xl  flex justify-center items-center  ">
                <button className="">Open</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-center font-bold text-[16px] ">
              <button className=" px-5 hover:bg-button text-button bg-button/20 transform duration-300 hover:text-white rounded-2xl">
                Claim
              </button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="">
      <div className="w-full table-container  h-[100px] rounded-lg flex justify-end items-center gap-10  px-[20px] mb-[20px]">
        <div className="text-white flex items-center gap-3">
          <h1>Share :</h1>
          <h1 className="font-bold">50%</h1>
        </div>
        <div className="text-white flex items-center gap-3">
          <h1>Balance :</h1>
          <h1 className="font-bold">124$</h1>
        </div>
        <IoNotifications className="text-[24px] cursor-pointer text-white" />
      </div>
      <div className="w-full table-container  h-auto rounded-lg flex justify-end items-center gap-10  px-[20px]">
        <Table
          className=" "
          bottomContentPlacement="outside"
          classNames={{ wrapper: "h-full p-0" }}
          bottomContent={
            <div className="flex flex-wrap gap-4 items-center justify-center ">
              {/* <Pagination
                initialPage={1}
                variant="bordered"
                size="lg"
                className="text-white rounded-lg bg-backgroundSecondary gap-10  "
                classNames={{
                  wrapper: "",
                  item: "",
                  cursor:
                    "bg-button/80 rounded-lg bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                }}
                showControls
                isCompact
                color="warning"
                // page={page}
                // total={pages}
                // onChange={(page) => setPage(page)}
              /> */}
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                className={`text-white border-secondary py-2 header-container  text-[16px] font-bold  `}
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={
              filteredBooster.length > 0 ? filteredBooster : filteredNotBooster
            }
            className="bg-white"
          >
            {(item) => (
              <TableRow className="font-bold text-[16px]" key={item.id}>
                {(columnKey) => (
                  <TableCell className=" border-secondary font-semibold ">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderBoosterPage;
