import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import "./Dashboard.css";
import { BsAirplaneFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  getKeyValue,
  Skeleton,
} from "@nextui-org/react";
import supabase from "../../config/supabase/supabase";
import { toastError } from "../../utils/toast";

interface RecentOrders {
  id: number;
  status: Status;
  game_id: number;
  order_id: number;
  price: number;
  booster: object;
  orders_details: OrderDetails[];
}

interface OrderDetails {
  end_division: string;
  end_rank: string;
  start_rank: string;
  start_division: string;
}

enum Status {
  Unpaid = "Unpaid",
  WaitingForBooster = "Waiting For Booster",
  OrderInProggress = "Order In Proggress",
  OrderCompleted = "Order Completed",
}

const columns = [
  { name: "Game", uid: "game_id" },
  { name: "ID", uid: "order_id" },
  { name: "Rank", uid: "orderDetails" },
  { name: "Booster", uid: "booster" },
  { name: "Price", uid: "price" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState<RecentOrders[]>([]);
  const [typeRecentOrders, setTypeRecentOrders] =
    useState<string>("Rank Boost Orders");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const flattenedData = recentOrders.map((item) => ({
    ...item,
    orderDetails: item.orders_details
      .map(
        (details) =>
          `${details.start_rank} ${details.start_division} - ${details.end_rank} ${details.end_division}`
      )
      .join(", "),
  }));

  console.log(flattenedData);

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const statusColorMap: any = {
    paid: "success",
    Unpaid: "danger",
    vacation: "warning",
  };

  const fetch = async () => {
    let type: string;
    //  Orders Coaching Orders Gold Orders

    try {
      setIsLoading(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) return toastError("Occured Error!");

      if (sessionData) {
        let type: string | null = null;
        if (typeRecentOrders === "Coaching Orders") type = "Coaching Order";
        if (typeRecentOrders === "Rank Boost Orders") type = "Rank Boost Order";
        if (typeRecentOrders === "Gold Orders") type = "Gold Order";

        const { data, error } = await supabase
          .from("orders")
          .select(
            "id, status, game_id, order_id, price, created_at, orders_details(start_rank,start_division,end_rank,end_division), booster:users_details!booster(nickname)"
          )
          .eq("customer", sessionData.session?.user.id)
          .eq("type_order", type)
          .range(0, 2)
          .order("created_at", { ascending: false });
        console.log(data);

        if (error) {
          console.log(error);
        } else {
          setRecentOrders(data);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [typeRecentOrders]);

  const renderCell = React.useCallback(
    (recentOrders: Record<string, any>, columnKey: any) => {
      const cellValue = recentOrders[columnKey];

      switch (columnKey) {
        case "game_id":
          return (
            <div className="w-full h-full  flex justify-center">
              <div className="w-[50px] rounded-full h-[50px] bg-white">{}</div>
            </div>
          );
        case "order_id":
          return (
            <div className="flex justify-center">
              <p className="text-bold text-sm capitalize text-white">
                {"#" + cellValue.toString().padStart(5, "0")}
              </p>
            </div>
          );
        case "orderDetails":
          return <div className="text-white text-center">{cellValue}</div>;
        case "booster":
          return (
            <div className="text-white text-center">
              {cellValue?.nickname || "--"}
            </div>
          );
        case "price":
          return (
            <div className="text-white text-center">{`$${cellValue}`}</div>
          );
        case "status":
          return (
            <div className=" flex justify-center items-center">
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
          return recentOrders.status === "Unpaid" ? (
            <div className="flex gap-2 justify-center items-center font-bold ">
              <div className="w-[40%] flex justify-center items-center  ">
                <button className=" text-[16px] px-3 hover:border-red-500 border-red-500/40  border rounded-2xl text-red-500/40 hover:text-red-500 transform duration-300">
                  Cancel
                </button>
              </div>
              <div className="hover:bg-red-500 px-3  text-[16px] text-red-500 bg-red-500/20 transform duration-300 hover:text-white  rounded-2xl w-[40%] flex justify-center items-center  ">
                <button className="">Pay</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold text-[16px] ">
              <button className="w-[80%]  hover:bg-button text-button bg-button/20 transform duration-300 hover:text-white rounded-2xl">
                Open
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
    <div className="w-full  h-full  ">
      <div className="h-full flex flex-col ">
        <div className="text-white flex w-full items-center  justify-between mb-[50px]">
          <div>
            <h1 className="font-bold text-[24px]">Hello, Rafansa Oktaviano</h1>
            <p className="text-slate-400">{`Today is ${formattedDate}`}</p>
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
        <div className=" w-full   ">
          <div className="left w-[70%]  ">
            <div className="grid grid-cols-3 gap-4 mb-[25px]">
              <div
                onClick={() => setTypeRecentOrders("Rank Boost Orders")}
                className={`${
                  typeRecentOrders === "Rank Boost Orders"
                    ? "text-white transform duration-300 "
                    : ""
                } container h-[200px] w-full text-secondary cursor-pointer bg-slate-600 rounded-xl flex justify-center items-center flex-col gap-4`}
              >
                <BsAirplaneFill className="text-[54px] " />
                <h1 className="font-bold">Rank Boost Orders</h1>
              </div>
              <div
                onClick={() => setTypeRecentOrders("Coaching Orders")}
                className={`${
                  typeRecentOrders === "Coaching Orders"
                    ? "text-white transform duration-300 "
                    : ""
                }  container h-[200px] w-full text-secondary cursor-pointer bg-slate-600 rounded-xl flex justify-center items-center flex-col gap-4`}
              >
                <FaBookOpen className="text-[54px] " />
                <h1 className="font-bold">Coaching Orders</h1>
              </div>
              <div
                onClick={() => setTypeRecentOrders("Gold Orders")}
                className={`${
                  typeRecentOrders === "Gold Orders"
                    ? "text-white transform duration-300 "
                    : ""
                }  container h-[200px] w-full text-secondary cursor-pointer bg-slate-600 rounded-xl flex justify-center items-center flex-col gap-4`}
              >
                <MdAttachMoney className="text-[54px] " />
                <h1 className="font-bold">Gold ( Coming Soon )</h1>
              </div>
            </div>
            <div className=" w-full  h-full  mb-[10px] text-white font-bold flex justify-between items-center">
              <h1>Recent Orders</h1>
              <button className="cursor-pointer px-4 py-1  text-secondary rounded-xl ">
                See all
              </button>
            </div>
            {isLoading === false ? (
              <div className="h-[250px] w-full table-cointainer overflow-auto rounded-xl ">
                <Table
                  aria-label="Example table with custom cells"
                  className="table-fixed"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn
                        className={`text-white border-secondary py-2 header-container  text-[16px] font-bold min-w-min  `}
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                      >
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>

                  <TableBody items={flattenedData}>
                    {(item) => (
                      <TableRow
                        className="font-bold text-[16px] "
                        key={item.id}
                      >
                        {(columnKey) => (
                          <TableCell className=" border-secondary">
                            {renderCell(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div role="status " className="w-full h-[250px] flex justify-center items-center">
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
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
