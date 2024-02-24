import React, { useEffect, useState } from "react";
import "./nav.css";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import { GoPersonFill } from "react-icons/go";
import { handleLogin } from "../../services/authService";
import { useAppSelector } from "../../redux/App/hooks";
import supabase from "../../config/supabase/supabase";
import { useAppDispatch } from "../../redux/App/hooks";
import { setIsLogin } from "../../redux/Features/auth";
import { toastSuccess } from "../../utils/toast";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();

  const isLogin = useAppSelector((state) => state.user.isLogin);
  console.log(isLogin);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    dispatch(setIsLogin(false));

    if (error === null) {
      toastSuccess("Logout Success!");
    }
  };

  return (
    <nav
      className={`w-full ${
        isMenuOpen === true ? "show-list" : ""
      }  nav-bg h-[100px]  flex fixed justify-around items-center`}
    >
      <Link to={"/"}>
        <h1
          className={`${
            isMenuOpen === true ? "logoshow hidden" : ""
          } text-white font-bold text-[24px] `}
        >
          BOOSTINGELO
        </h1>
      </Link>
      <ul
        className={` text-secondary ${
          isMenuOpen === true ? "text-white show-li" : ""
        } nav-list flex gap-[40px] font-semibold`}
      >
        <Link to={"league-of-legends/elo-boost"}>
          <li className="hover:text-white">League of Legends</li>
        </Link>
        <Link to={"valorant/elo-boost"}>
          <li className="hover:text-white">Valorant</li>
        </Link>
        <li className="hover:text-white">Teamfight Tactics</li>
        <li className="hover:text-white">Dota 2</li>
      </ul>
      <div
        className={`${isMenuOpen === true ? "wrap-burger2" : ""} wrap-burger`}
      >
        {isLogin === false ? (
          <div
            onClick={() => setIsLoginModal(!isLoginModal)}
            className={` nav-btn ${
              isMenuOpen === true ? "show-btn" : "hide-btn"
            }`}
          >
            <button
              className={`${
                isMenuOpen === true ? "show-btn2" : "hide-btn"
              } nav-btn  text-buttonText bg-button font-semibold`}
            >
              Login
            </button>
          </div>
        ) : (
          <div
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
          >
            <GoPersonFill className="text-white text-[32px]" />
            {isHovering && (
              <div className=" bg-background dropdown-menu text-white rounded-xl">
                <ul>
                  <li className="hover:bg-slate-700 rounded-xl cursor-pointer ">
                    <a>Dashboard</a>
                  </li>
                  <li
                    onClick={() => handleLogout()}
                    className="hover:bg-slate-700 rounded-xl cursor-pointer "
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <LoginModal
          isOpen={isLoginModal}
          onRequestClose={() => setIsLoginModal(false)}
          onSignUpOpen={() => {
            setIsSignUpModal(true);
            setIsLoginModal(false);
          }}
        />
        <SignUpModal
          isOpen={isSignUpModal}
          onRequestClose={() => setIsSignUpModal(false)}
          onLoginOpen={() => {
            setIsSignUpModal(false);
            setIsLoginModal(true);
          }}
        />
        <label className="burger hidden " htmlFor="burger">
          <input
            type="checkbox"
            id="burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <span className="bg-white text-white"></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </nav>
  );
};

export default Nav;
