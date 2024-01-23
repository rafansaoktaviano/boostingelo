import React, { useEffect, useState } from "react";
import "./nav.css";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import { GoPersonFill } from "react-icons/go";
import { handleLogin } from "../../services/authService";
import { useAppSelector } from "../../redux/App/hooks";
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);

  const isLogin = useAppSelector((state) => state.user.isLogin);
  console.log(isLogin);

  return (
    <nav
      className={`w-full ${
        isMenuOpen === true ? "show-list" : ""
      }  nav-bg h-[100px]  flex fixed justify-around items-center`}
    >
      <h1
        className={`${
          isMenuOpen === true ? "logoshow hidden" : ""
        } text-white font-bold text-[24px] `}
      >
        BOOSTINGELO
      </h1>
      <ul
        className={` text-secondary ${
          isMenuOpen === true ? "text-white show-li" : ""
        } nav-list flex gap-[40px] font-semibold`}
      >
        <li className="hover:text-white">League of Legends</li>
        <li className="hover:text-white">Valorant</li>
        <li className="hover:text-white">Teamfight Tactics</li>
        <li className="hover:text-white">Dota 2</li>
      </ul>
      <div
        className={`${isMenuOpen === true ? "wrap-burger2" : ""} wrap-burger`}
      >
        {isLogin === false ? (
          <div
            onClick={() => setIsLoginModal(!isLoginModal)}
            className={` nav-btn ${isMenuOpen === true ? "show-btn" : ""}`}
          >
            <button
              className={`${
                isMenuOpen === true ? "show-btn2" : ""
              } nav-btn  text-buttonText bg-button font-semibold`}
            >
              Login
            </button>
          </div>
        ) : (
          <GoPersonFill className="text-white text-[32px]"/>
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
