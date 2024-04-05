import React from "react";
import { FaUnlockKeyhole } from "react-icons/fa6";
import supabase from "../../config/supabase/supabase";
import { toastError, toastSuccess } from "../../utils/toast";

interface AccountDetailsProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  region: string;
  setRegion: (region: string) => void;
  order_id: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  region,
  setRegion,
  order_id,
}) => {
  const handleSendUsernamePassword = async () => {
    try {
      if (!username || !password) {
        return toastError(`username and password can't be empty`);
      }

      const { data, error } = await supabase
        .from("orders")
        .update({ username: username, password: password })
        .eq("order_id", parseInt(order_id as string))
        .select();

      if (error) return toastError("Error!");
      console.log(data);

      toastSuccess("Submit Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full   px-[20px] flex flex-col items-center">
      <h1 className="text-highlight text-center mb-[10px]">Account</h1>
      <form className="w-full">
        <div className="relative mb-[20px] cursor-pointer">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-white/80 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="email-address-icon"
            className="bg-gray-50/50 border text-white placeholder-white/80 border-gray-300/50  text-sm rounded-3xl  block w-full px-[40px] py-2"
            placeholder="Account name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative mb-[40px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaUnlockKeyhole className="text-24px text-white/80" />
          </div>
          <input
            type="text"
            id="password-icon"
            className="bg-gray-50/50 border text-white placeholder-white/80 border-gray-300/50  text-sm rounded-3xl  block w-full px-[40px] py-2 "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button
        onClick={handleSendUsernamePassword}
        className="w-full hover:scale-105 transform  duration-300 text-white cursor-pointer py-2 bg-button rounded-3xl mb-[20px]"
      >
        Submit
      </button>
      <h1 className="text-center text-[12px] text-red-600 flex justify-center items-center gap-2">
        &#9432; Change your password after your order is complete!!!.
      </h1>
      <h1 className="text-highlight text-center ">Region</h1>
      <select
        className="bg-button text-white font-bold  m-[10px] cursor-pointer relative appearance-none px-10 py-2 bg-opacity-10  rounded-3xl w-full "
        id="region"
        name="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option selected value="NA">
          NA
        </option>
        <option value="EU">EU</option>
        <option value="OCE">OCE</option>
        <option value="SEA">SEA</option>
      </select>
    </div>
  );
};

export default AccountDetails;
