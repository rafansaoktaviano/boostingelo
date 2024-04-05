import React, { useState } from "react";
import supabase from "../../config/supabase/supabase";
import { toastError, toastSuccess } from "../../utils/toast";
interface NotesProp {
  notes: string;
  order_id: string;
}
const Notes: React.FC<NotesProp> = ({ notes, order_id }) => {
  const [notesState, setNotesState] = useState(notes);

  const handleSubmit = async () => {
    try {
      if (notesState === "") return toastError("Input something!");

      const { data, error } = await supabase
        .from("orders_details")
        .update([{ notes: notesState }])
        .eq("order_id", parseInt(order_id as string))
        .select();

      if (error) toastError("Error!");

      toastSuccess("Submit Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full   px-[20px] flex flex-col items-center">
      <h1 className="text-white/70 text-center  text-[12px]">
        If you have any additional requests, feel free to let the booster know
      </h1>
      <textarea
        value={notesState}
        onChange={(e) => setNotesState(e.target.value)}
        placeholder="Notes"
        className="bg-transparent my-[20px] border-white/35 h-[100px] border w-full rounded-xl text-white text-[12px] p-[10px]"
      ></textarea>
      <button
        onClick={handleSubmit}
        className=" w-full hover:scale-105 transform  duration-300 text-white cursor-pointer py-2 bg-button rounded-3xl mb-[20px]"
      >
        Submit
      </button>
    </div>
  );
};

export default Notes;
