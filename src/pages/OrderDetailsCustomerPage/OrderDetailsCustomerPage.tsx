import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";
import { FaChampagneGlasses } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { IoFastFood, IoPerson } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import supabase from "../../config/supabase/supabase";
import { toastError } from "../../utils/toast";
import ImageRank from "../../components/ImageRank/ImageRank";
import { RankType } from "../../components/ImageRank/ImageRank";
import Cookies from "js-cookie";
// import { SocketContext } from "../../context/socket";
import AccountDetails from "../../components/AccountDetails/AccountDetails";
import Agents from "../../components/Agents/Agents";
import PopOver from "../../components/PopOver/PopOver";

import { CiStreamOn } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Notes from "../../components/Notes/Notes";

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

type SupabaseSession = import("@supabase/supabase-js").Session | null;

export interface UsersDetails {
  role: string;
  nickname: string;
}

const OrderDetailsCustomerPage = () => {
  const [data, setData] = useState<Orders | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const { id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [messageData, setMessageData] = useState<message[] | null>([]);
  const [tabs, setTabs] = useState(1);
  // const socket = useContext(SocketContext);

  const fetchMessages = async () => {
    try {
      let { data: chat_messages, error } = await supabase
        .from("chat_messages")
        .select("*, users_details(role,nickname)")
        .eq("room_id", parseInt(id || "", 10))
        .order("created_at", { ascending: true });
      console.log(chat_messages);
      console.log(error);

      setMessageData(chat_messages);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch = async () => {
    try {
      const session = await supabase.auth.getSession();
      setSession(session.data.session);

      console.log('session', session);
      

      let { data: orders, error } = await supabase
        .from("orders")
        .select(
          "order_id,booster,username,password,order_complete_proof,type_order,region,status, games(*), orders_details(start_rank,start_division,end_rank,end_division, current_rank, current_rank_rating, current_division,rank_rating,type_service,win_match,agents_request,priority,stream,offline_chat,no_stack,notes)"
        )
        .eq("order_id", parseInt(id || "", 10))
        .eq("customer", session.data.session?.user.id)
        .single();

      if (error) {
        return console.log("Error!");
      }
      if (orders) {
        console.log(data);
        
        setData(orders);
        setUsername(orders.username);
        setPassword(orders.password);
        setRegion(orders.region);
      }
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

  useEffect(() => {
    const channel = supabase
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
      .subscribe();
    fetch();
    fetchMessages();

    return () => {
      channel.unsubscribe();
    };
    // socket.emit("join", parseInt(id as string));
    // socket.on("message sent", (msg) => {
    //   // fetchMessages();
    // });
  }, []);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const onMessageSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (message === "") return;
      // socket.emit("message", { message, id });
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
          <div className="table-container h-auto py-[20px] px-[80px]">
            <h1 className="text-white text-center font-semibold">
              {data ? data?.games.name + " | " + data?.type_order : <div></div>}
            </h1>
            <div className="flex justify-center gap-5 ">
              <button
                onClick={() => setTabs(1)}
                value={tabs}
                className={`${
                  tabs === 1
                    ? "bg-button text-white"
                    : "bg-button/70 text-white/70"
                } px-5 py-2 text-[12px] my-[20px] flex gap-2 justify-center items-center  rounded-3xl `}
              >
                <IoPerson />
                Account Details
              </button>
              <button
                onClick={() => setTabs(2)}
                className={`${
                  tabs === 2
                    ? "bg-button text-white"
                    : "bg-button/70 text-white/70"
                } px-5 py-2 text-[12px] my-[20px] flex gap-2 justify-center items-center  rounded-3xl `}
              >
                <FaChampagneGlasses />
                Agents
              </button>
              <button
                onClick={() => setTabs(3)}
                className={`${
                  tabs === 3
                    ? "bg-button text-white"
                    : "bg-button/70 text-white/70"
                } px-5 py-2 text-[12px] my-[20px] flex gap-2 justify-center items-center  rounded-3xl `}
              >
                <FaBook />
                Notes
              </button>
            </div>
            {tabs === 1 ? (
              <AccountDetails
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                region={region}
                setRegion={setRegion}
                order_id={id as string}
              />
            ) : tabs === 2 ? (
              <Agents
                agents={data?.orders_details[0].agents_request as string[]}
                order_id={id as string}
              />
            ) : tabs === 3 ? (
              <Notes
                order_id={id as string}
                notes={data?.orders_details[0].notes as string}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-[20px] table-container h-auto py-[20px] px-[80px] mb-[50px]">
            <h1 className="text-highlight text-center">
              Chat with your booster
            </h1>
            <div
              ref={messageContainerRef}
              style={{ scrollBehavior: "smooth" }}
              className=" w-full h-[400px] py-[20px]  overflow-auto"
            >
              {messageData &&
                messageData?.map((value, index) => {
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
                              {`(${value.users_details.role}) ${value.users_details.nickname || ""}`}
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
                              {value.users_details.nickname || "(Customer)"}
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
                value={message}
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

              <div className="text-center text-white text-[12px] mt-[30px]">
                <h1>BOOSTER</h1>
                <h1 className="font-bold">Ravs</h1>
              </div>
              <div className="text-center text-white text-[12px] mt-[30px]">
                <h1>OPTIONS</h1>
                <div className="flex justify-center items-center gap-2 my-[20px]">
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
          <div className="table-container py-[20px] px-[40px] mt-[20px]">
            <h1 className="text-white text-center">Leave a tip</h1>
            <button className=" cursor-pointer w-full py-2 my-[20px] rounded-3xl font-bold text-slate-400 bg-button/70 transform duration-300 hover:text-white hover:bg-button">
              Customer Support
            </button>
            <button className="cursor-pointer w-full py-2  rounded-3xl font-bold text-slate-400 bg-button/70 transform duration-300 hover:text-white hover:bg-button">
              Booster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCustomerPage;
