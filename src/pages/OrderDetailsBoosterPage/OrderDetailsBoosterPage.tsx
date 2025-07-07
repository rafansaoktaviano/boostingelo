import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import supabase from "../../config/supabase/supabase";
import { toastError, toastSuccess } from "../../utils/toast";
import ImageRank from "../../components/ImageRank/ImageRank";
import PopOver from "../../components/PopOver/PopOver";

import { CiStreamOn } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { RankType } from "../../components/ImageRank/ImageRank";
import axiosInstance from "../../config/api/api";
import Swal from "sweetalert2";
import { useAppSelector } from "../../redux/App/hooks";

export interface Orders {
  order_id: number;
  booster: string;
  username: string;
  password: string;
  order_complete_proof: string;
  type_order: string;
  region: string;
  status: string;
  games: any;
  orders_details: OrdersDetail[];
  price: number;
}

export interface OrdersDetail {
  stream: boolean;
  end_rank: string;
  no_stack: boolean;
  priority: boolean;
  win_match: number;
  start_rank: string;
  rank_rating: number;
  end_division: string;
  offline_chat: boolean;
  type_service: string;
  agents_request: string[];
  start_division: string;
  current_rank: string;
  current_division: string;
  current_rank_rating: string;
  notes: string;
}

interface message {
  id: number;
  created_at: string;
  user_id: string;
  is_read: boolean;
  message: string;
  room_id: number;
  users_details: UsersDetails;
}

export interface UsersDetails {
  role: string;
  nickname: string;
}

type SupabaseSession = import("@supabase/supabase-js").Session | null;
type Role = "customer" | "booster" | "admin" | "owner" | null;

const OrderDetailsBoosterPage = () => {
  const role = useAppSelector((state) => state.user.role) as Role;
  const [messageData, setMessageData] = useState<message[] | null>([]);
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [data, setData] = useState<Orders | null>(null);
  const [agents, setAgents] = useState([]);
  const { id } = useParams();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [RR, setRR] = useState<number>(0);
  const [rank, setRank] = useState<string>("");

  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      let { data: chat_messages, error } = await supabase
        .from("chat_messages")
        .select("*, users_details(role,nickname)")
        .eq("room_id", parseInt(id || "", 10))
        .order("created_at", { ascending: true });

      setMessageData(chat_messages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch = async () => {
    const session = await supabase.auth.getSession();
    setSession(session.data.session);

    let { data: orders, error } = await supabase
      .from("orders")
      .select(
        "order_id,booster,price,username,password,order_complete_proof,type_order,region,status, games(*), orders_details(start_rank,start_division,end_rank,end_division, current_rank, current_rank_rating, current_division,rank_rating,type_service,win_match,agents_request,priority,stream,offline_chat,no_stack,notes)"
      )
      .eq("order_id", parseInt(id as string, 10))
      .eq("booster", session.data.session?.user.id)
      .single();

    if (error) {
      console.log(error);

      return console.log("Error!");
    }

    if (orders) {
      setData(orders);
      setAgents(orders.orders_details[0].agents_request);
    }
  };

  const onMessageSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (message === "") return;

      const { data, error } = await supabase
        .from("chat_messages")
        .insert([
          {
            room_id: id,
            message: message,
            is_read: false,
            user_id: session?.user.id,
          },
        ])
        .select();
      if (error) return toastError("Error!");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInserts = (payload: any) => {
    if (payload) {
      fetchMessages();
      console.log(payload);
    }
  };

  const handleSubmitmatch = async () => {
    try {
      const session = await supabase.auth.getSession();
      if (!id || !session || !RR || !rank)
        return toastError("Rank or Rating can't be Empty");

      const dataBody = {
        room_id: id,
        user_id: session.data.session?.user.id,
        RR: RR,
        rank: rank,
      };
      const res = await axiosInstance.post("/order/system", dataBody);

      if (res.data.isError === false) {
        toastSuccess(res.data.message);
        fetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteOrder = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Order ID : ${"#" + id?.toString().padStart(5, "0")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete the order!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data, error } = await supabase
            .from("orders")
            .update({ status: "Order Completed" })
            .eq("order_id", id)
            .single(); // assuming only one row will be updated

          if (error) {
            return toastError("Server Error!");
          }

          Swal.fire({
            title: "Completed!",
            text: "Order has been completed",
            icon: "success",
          });

          const { data: messageData, error: messageError } = await supabase
            .from("chat_messages")
            .insert([
              {
                room_id: id,
                message: "🎉 Your order has been completed 🎉",
                is_read: false,
                user_id: session?.user.id,
              },
            ])
            .select();

          if (messageError) return toastError("Server Error!");

          navigate("/booster/orders");
        } catch (error) {
          return toastError("Server Error!");
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchMessages(), fetch()]);
    };
    fetchData();

    supabase
      .channel(id as string)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          filter: `room_id=eq.${parseInt(id as string)}`,
          table: "chat_messages",
        },
        handleInserts
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          filter: `order_id=eq.${parseInt(id as string)}`,
          table: "orders",
        },
        handleInserts
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          filter: `order_id=eq.${parseInt(id as string)}`,
          table: "orders_details",
        },
        handleInserts
      )
      .subscribe();
    // listen to chat messages changes
    // listen to orders changes
    // listen to orders_details changes
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messageData]);

  return (
    <div className=" w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-white  text-[24px] font-bold mb-[20px]">
          {`Order #${id}`}
        </h1>
        <h1 className="text-white  text-[24px] font-bold mb-[20px]">
          {data?.status || ""}
        </h1>
      </div>
      <div className="flex w-full  gap-4 ">
        <div className="left w-[60%] ">
          <div className=" table-container h-auto py-[20px] px-[80px] mb-[50px]">
            <h1 className="text-highlight text-center">
              Chat with your customer
            </h1>
            <div
              ref={messageContainerRef}
              style={{ scrollBehavior: "smooth" }}
              className=" w-full h-[400px] py-[20px]  overflow-auto"
            >
              {messageData?.map((value, index) => {
                const dateTime: Date = new Date(value.created_at);
                const options: Intl.DateTimeFormatOptions = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC",
                };

                const formattedDateTime = dateTime.toLocaleString(
                  "en-US",
                  options
                );

                return (
                  <div key={index} className="my-[10px]">
                    {value.user_id === session?.user.id ? (
                      <>
                        <div className=" flex justify-end ">
                          <p className="text-white text-[12px]">
                            {`${value.users_details.role}`}
                          </p>
                        </div>
                        <div className=" flex justify-end ">
                          <button className="p-2  h-auto w-auto rounded-md text-white bg-secondary">
                            {value.message}
                          </button>
                        </div>
                        <div className=" flex justify-end ">
                          <p className=" text-[10px] text-white ">
                            {`${formattedDateTime}`}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" flex justify-start ">
                          <p className="text-white text-[12px]">
                            {value.users_details.nickname || value.users_details.role}
                          </p>
                        </div>
                        <div className=" flex justify-start ">
                          <button className="p-2   h-auto w-auto rounded-md text-white bg-secondary">
                            {value.message}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={onMessageSubmit}
              className="flex items-center gap-4"
            >
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                id="send-message"
                className="bg-gray-50/50 border text-white placeholder-white/80 border-gray-300/50  text-sm rounded-3xl  block w-full px-[20px] py-2 "
                placeholder="Send message"
                defaultValue={message}
              />
              <button
                type="submit"
                className="p-3 rounded-lg bg-button cursor-pointer"
              >
                <IoSend className="text-white  " />
              </button>
            </form>
          </div>
        </div>
        <div className="w-[40%]  h-full ">
          <div className="table-container h-auto py-[20px]">
            <div className="">
              <div className="flex justify-around text-center text-[14px] text-white">
                <div className="flex flex-col items-center">
                  <h1 className="text-[14px]">START</h1>
                  {data ? (
                    <>
                      <ImageRank
                        rank={data?.orders_details[0].start_rank as RankType}
                      />
                      <h1 className="text-[14px]">
                        {`${data?.orders_details[0].start_rank} ${data?.orders_details[0].start_division} (${data?.orders_details[0].rank_rating})`}
                      </h1>
                    </>
                  ) : null}
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-[14px]">CURRENT</h1>
                  {data ? (
                    <>
                      <ImageRank
                        rank={data?.orders_details[0].current_rank as RankType}
                      />
                      <h1 className="text-[14px]">{`${data?.orders_details[0].current_rank} ${data?.orders_details[0].current_division} (${data?.orders_details[0].current_rank_rating})`}</h1>
                    </>
                  ) : null}
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-[14px]">TARGET</h1>
                  {data ? (
                    <>
                      <ImageRank
                        rank={data?.orders_details[0].end_rank as RankType}
                      />
                      <h1 className="text-[14px]">
                        {`${data?.orders_details[0].end_rank} ${data?.orders_details[0].end_division} (0)`}
                      </h1>
                    </>
                  ) : null}
                </div>
              </div>

              <div className=" text-white text-[12px] mt-[30px]">
                <h1 className="text-center">DETAILS</h1>
                <div className="flex mt-[10px] justify-between px-[20px] items-center">
                  <div>
                    <h1 className="">Username : {data?.username}</h1>
                    <h1 className="">Password : {data?.password}</h1>
                  </div>
                  <div>
                    <h1>Region : {data?.region}</h1>
                    <h1>Notes : {data?.orders_details[0].notes}</h1>
                    <h1>Price : ${(data?.price as number) * 0.5}</h1>
                  </div>
                </div>
                <h1 className="my-[10px] text-center">AGENTS</h1>
                <div className="flex justify-center gap-3 flex-wrap">
                  {agents &&
                    agents.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className={`${"bg-button border-button text-white "} cursor-pointer mb-[5px]  px-2 border rounded-lg flex justify-center items-center text-[13px]`}
                        >
                          <button className="">{value}</button>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="text-center text-white text-[12px] mt-[10px]">
                <h1>OPTIONS</h1>
                <div className="flex justify-center items-center gap-2 my-[20px] flex-wrap">
                  {data?.orders_details.map((value, index) => {
                    return (
                      <>
                        <span key={index}>
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
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <>
            <div className="table-container h-auto py-[20px] mt-[20px] px-[20px]">
              <h1 className="text-white text-center font-bold">Submit Match</h1>
              <div className="flex gap-5 mt-[10px] mb-[20px]">
                <div className="w-[75%] flex flex-col items-cetner gap-2">
                  <h1 className="text-highlight text-center font-bold">RANK</h1>
                  <input
                    type="text"
                    id="Rank-input"
                    className="bg-gray-50/50 border text-white placeholder-white/80 border-gray-300/50  text-sm rounded-xl  block w-full px-[20px] py-2 "
                    placeholder="Ex: Ascendant 2"
                    onChange={(e) => setRank(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-highlight text-center font-bold ">
                    RATING
                  </h1>
                  <input
                    type="number"
                    id="RR-input"
                    className="bg-gray-50/50 border text-white placeholder-white/80 border-gray-300/50  text-sm rounded-xl  block w-full px-[20px]  py-2"
                    placeholder="Ex: 50"
                    onChange={(e) => setRR(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <button
                onClick={() => handleSubmitmatch()}
                className="w-full hover:scale-105 transform   duration-300 text-white cursor-pointer py-2 bg-button rounded-xl mb-[20px] font-bold"
              >
                Submit
              </button>
            </div>
            <div className="table-container h-auto py-[20px] mt-[20px]  p-[20px]">
              <button
                onClick={() => handleCompleteOrder()}
                className="w-full hover:scale-105 transform   duration-300 text-white cursor-pointer py-2 bg-button rounded-xl  font-bold"
              >
                Complete Order
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsBoosterPage;
