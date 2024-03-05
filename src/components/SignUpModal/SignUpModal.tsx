import React, { useState } from "react";
import Modal from "react-modal";
import signupbackground from "./.././../assets/signupbackground.jpeg";
import supabase from "../../config/supabase/supabase";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../utils/toast";
import { setIsLogin } from "../../redux/Features/auth";
import { useAppDispatch } from "../../redux/App/hooks";
import { useDispatch } from "react-redux";

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onLoginOpen: () => void;
}

const SignUpModal: React.FC<LoginModalProps> = ({
  isOpen,
  onRequestClose,
  onLoginOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onSubmitSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      toastError("Email has already registered");
    } else {
      toastSuccess("Sign Up Success");
      toastSuccess(`Welcome, ${email}`);
      dispatch(setIsLogin(true));
      onRequestClose();
    }

    console.log(data);
    console.log(error);
  };

  const onLoginGoogle = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const customStyles = {
    content: {
      width: "800px",
      height: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      zIndex: "50",
      backgroundColor: "#16161a",
      border: 0,
      padding: 0,
      margin: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: "40",
    },
  };
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className="w-full h-full flex">
        <div className="h-full w-[50%] bg-background">
          <img
            src={signupbackground}
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="w-[50%] p-[20px] text-white">
          <h1 className="text-[34px] font-bold text-center mt-[40px]">
            Sign Up
          </h1>
          <form
            onSubmit={onSubmitSignUp}
            action="
          "
          >
            <div className="mt-[20px]">
              <label htmlFor="email" className="cursor-pointer font-bold ">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
                className="w-full cursor-pointer placeholder-slate-500  bg-opacity-60 bg-[#3d3241]  p-[10px] rounded-lg mt-[10px]  "
                placeholder="John@gmail.com"
              />
            </div>
            <div className="mt-[20px]">
              <label htmlFor="password" className="cursor-pointer font-bold ">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
                className="w-full cursor-pointer  bg-opacity-60 bg-[#3d3241]  p-[10px] rounded-lg mt-[10px] placeholder-white "
              />
            </div>
            <h1 className="text-center mt-[20px] text-secondary">
              Have an account ?{" "}
              <span
                onClick={() => onLoginOpen()}
                className="font-bold text-highlight cursor-pointer "
              >
                Login
              </span>
            </h1>
            <button
              type="submit"
              className="font-bold flex justify-center items-center w-full rounded-xl bg-button p-[10px] mt-[20px]"
            >
              Sign Up
            </button>
          </form>
          <div className="flex gap-5 items-center mt-[30px]">
            <div className="w-[40%] h-[1px] bg-secondary"></div>
            <h1>OR</h1>
            <div className="w-[40%] h-[1px] bg-secondary"></div>
          </div>
          <button
            onClick={() => onLoginGoogle()}
            className="flex justify-center items-center w-full rounded-xl bg-white text-black p-[10px] mt-[20px] font-bold gap-2"
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt=""
            />{" "}
            Google
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
