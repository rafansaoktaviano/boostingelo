import React, { useEffect, useState } from "react";
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
import { CiStreamOn } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { toastError } from "../../utils/toast";

import supabase from "../../config/supabase/supabase";
import valorantlogo from "./../../assets/valorantlogo.png";
import dotalogo from "./../../assets/dota2logo.png";
import lollogo from "./../../assets/lollogo.png";
import tftlogo from "./../../assets/TFTlogo.png";
import PopOver from "../../components/PopOver/PopOver";
import { Link } from "react-router-dom";

const columns = [
  { name: "Game", uid: "game_id" },
  { name: "ID", uid: "order_id" },
  { name: "Rank", uid: "orders_details" },
  { name: "Details", uid: "details" },
  { name: "Region", uid: "region" },
  { name: "Booster", uid: "booster" },
  { name: "Price", uid: "price" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

interface typeTest {
  test: string;
  id: number;
}

interface OrdersType {
  id: number;
  status: Status;
  game_id: number;
  order_id: number;
  price: number;
  booster: object;
  orders_details: OrderDetails[];
  type_order: string;
  region: string;
}

interface OrderDetails {
  end_division: string;
  end_rank: string;
  start_rank: string;
  start_division: string;
  type_service: string;
  priority: boolean;
  stream: boolean;
  offline_chat: boolean;
  rank_rating: number;
  win_match: number;
  no_stack: boolean;
}

enum Status {
  Unpaid = "Unpaid",
  WaitingForBooster = "Waiting For Booster",
  OrderInProggress = "Order In Proggress",
  OrderCompleted = "Order Completed",
}

const OrdersCustomerPage = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;
  const pages = Math.ceil(orders.length / rowsPerPage);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetch = async () => {
    try {
      setIsRefreshing(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) return toastError(sessionError.message);

      if (sessionData) {
        const { data, error } = await supabase
          .from("orders")
          .select(
            "id, status, game_id, region ,order_id, price, created_at, type_order, orders_details(start_rank ,start_division,end_rank,end_division,type_service, priority,stream ,rank_rating, no_stack, offline_chat, rank_rating, win_match), booster:users_details!booster(nickname)"
          )
          .eq("customer", sessionData.session?.user.id)
          .order("created_at", { ascending: false });
        console.log(data);

        if (error === null) {
          setOrders(data);
        } else {
          toastError(error.message);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const refresh = async () => {
    try {
      await fetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (isRefreshing) {
      refresh();
    }
  }, [isRefreshing]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders.slice(start, end);
  }, [page, orders]);

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
        case "region":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {cellValue}
              </p>
            </div>
          );
        case "orders_details":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {cellValue?.map((value: OrderDetails, index: number) => {
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
        case "details":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {orders.orders_details.map(
                  (value: OrderDetails, index: number) => {
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

        case "booster":
          return (
            <div className="flex justify-start">
              <p className="text-bold text-sm capitalize text-white">
                {cellValue?.nickname}
              </p>
            </div>
          );
        case "price":
          return <div className="text-white text-start">{`$${cellValue}`}</div>;
        case "status":
          return (
            <div className=" flex justify-start items-center">
              <div
                className={`p-1 ${
                  cellValue === "Unpaid"
                    ? "text-red-500 "
                    : cellValue === "Waiting For Booster"
                    ? "text-yellow-500 "
                    : cellValue === "Order In Proggress"
                    ? "text-green-500 "
                    : cellValue === "Order Completed"
                    ? "text-button "
                    : ""
                }  rounded-xl text-[14px] `}
              >
                {cellValue}
              </div>
            </div>
          );
        case "actions":
          return orders.status === "Unpaid" ? (
            <div className="flex gap-2 justify-start items-center font-bold ">
              {/* <div className=" flex justify-center items-center  ">
                <button className=" text-[16px] px-3 hover:border-red-500 border-red-500/40  border rounded-2xl text-red-500/40 hover:text-red-500 transform duration-300">
                  Cancel
                </button>
              </div> */}
              <div className="hover:bg-red-500 px-3  text-[16px] text-red-500 bg-red-500/20 transform duration-300 hover:text-white  rounded-2xl w-[70%] flex justify-center items-center  ">
                <button className="">Pay</button>
              </div>
            </div>
          ) : (
            <Link to={`/order/${orders.order_id.toString().padStart(5, "0")}`}>
              <div className="flex justify-start items-center font-bold text-[16px] ">
                <button className="w-[70%]  hover:bg-button text-button bg-button/20 transform duration-300 hover:text-white rounded-2xl">
                  Open
                </button>
              </div>
            </Link>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  return (
    <div className="w-full  h-full  ">
      <div className="h-full flex flex-col overflow-auto">
        <div className="text-white flex w-full items-center  justify-between mb-[50px]">
          <div>
            <h1 className="font-bold text-[24px]">ORDERS</h1>
          </div>
          <div className="flex items-center gap-5">
            <IoNotifications className="text-[24px] cursor-pointer" />
            <div className="px-8 font-bold bg-button  rounded-xl py-4  cursor-pointer">
              <button className="flex gap-2 items-center ">
                New Order <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end rounded-xl">
          <button
            onClick={() => refresh()}
            className="px-4  rounded-xl py-2   text-secondary flex  justify-center items-center gap-2 hover:scale-125 transform duration-300"
          >
            <LuRefreshCcw
              className={`${isRefreshing === true ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </button>
        </div>
        {isRefreshing === false ? (
          <div className="h-full w-full table-cointainer pb-[50px] rounded-xl ">
            <Table
              className=" "
              bottomContentPlacement="outside"
              classNames={{ wrapper: "h-full p-0" }}
              bottomContent={
                <div className="flex flex-wrap gap-4 items-center justify-center ">
                  <Pagination
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
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
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
              <TableBody items={items} className="bg-white">
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
        ) : (
          <div
            role="status "
            className="w-full h-[250px] flex justify-center items-center"
          >
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-button"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersCustomerPage;
