import React, { useState } from "react";
import supabase from "../../config/supabase/supabase";
import { toastError, toastSuccess } from "../../utils/toast";

interface AgentsProps {
  agents: string[];
  order_id: string;
}

const Agents: React.FC<AgentsProps> = ({ agents, order_id }) => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(agents);

  const valorantAgents: string[] = [
    "Brimstone",
    "Jett",
    "Viper",
    "Omen",
    "Killjoy",
    "Cypher",
    "Sova",
    "Sage",
    "Breach",
    "Skye",
    "Phoenix",
    "Raze",
    "Reyna",
    "Yoru",
    "Astra",
  ];

  console.log(selectedAgents);

  const handleSelectAgents = (value: string) => {
    setSelectedAgents((prevAgents) => {
      if (prevAgents.includes(value)) {
        return prevAgents.filter((agent) => agent !== value);
      } else {
        return [...prevAgents, value];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedAgents.length < 3)
        return toastError("Choose a minimum of 3 agents");

      const { data, error } = await supabase
        .from("orders_details")
        .update([{ agents_request: selectedAgents }])
        .eq("order_id", parseInt(order_id as string))
        .select();

      console.log(data);
      console.log(error);

      if (error) toastError("Error!");

      toastSuccess("Submit Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full   px-[20px] flex flex-col items-center">
      <h1 className="text-white/70 text-center  text-[12px]">
        Kindly choose a minimum of 3 agents. If you prefer not to make a
        selection, our booster will decide which champions to play.
      </h1>
      <h1 className="text-center text-white my-[20px]">Select</h1>
      <div className="flex flex-wrap gap-2">
        {valorantAgents.map((value, index) => {
          return (
            <div
              onClick={() => handleSelectAgents(value)}
              className={`${
                selectedAgents?.includes(value)
                  ? "bg-button border-button text-white "
                  : "border-button/70 text-white/70 "
              } cursor-pointer mb-[5px]  px-2 border rounded-lg flex justify-center items-center text-[13px]`}
            >
              <button className="">{value}</button>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => handleSubmit()}
        className="hover:scale-105 transform  duration-300 mt-[40px] w-full text-white cursor-pointer py-2 bg-button rounded-3xl mb-[20px]"
      >
        Submit
      </button>
    </div>
  );
};

export default Agents;
