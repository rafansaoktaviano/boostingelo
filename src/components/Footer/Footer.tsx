import React from "react";
import lol from "./../../assets/lollogo.png";
const Footer = () => {
  return (
    <footer className="w-full h-[300px] wrapper-footer bg-background pt-[70px] px-[200px] flex gap-20">
      <div className="">
        <h1 className="text-white font-bold text-[18px] mb-[20px]">Services</h1>
        <div className="flex flex-col gap-2">
          <span className="text-secondary hover:text-white cursor-pointer">
            League of Legends
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Valorant
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Teamfight Tactics
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Dota 2
          </span>
        </div>
      </div>
      <div>
        <h1 className="text-white font-bold text-[18px] mb-[20px]">
          Resources
        </h1>
        <div className="flex flex-col gap-2">
          <span className="text-secondary hover:text-white cursor-pointer">
            Terms of Service
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Cookie Policy
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Refund Policy
          </span>
        </div>
      </div>
      <div>
        <h1 className="text-white font-bold text-[18px] mb-[20px]">Helper</h1>
        <div className="flex flex-col gap-2">
          <span className="text-secondary hover:text-white cursor-pointer">
            About Us
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Contact Us
          </span>
          <span className="text-secondary hover:text-white cursor-pointer">
            Cookie Policy
          </span>
        </div>
      </div>
      <div>
        <h1 className="text-white font-bold text-[18px] mb-[20px]">
          Become a Booster
        </h1>
        <div className="flex flex-col gap-2">
          <span className="text-secondary hover:text-white cursor-pointer">
            Jobs
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
