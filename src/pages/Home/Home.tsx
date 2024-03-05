import React from "react";
import background from "./../../assets/jinx2.jpeg";
import "./home.css";
import { FaCheck } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { FaCalendarCheck } from "react-icons/fa";
import { PiChatsCircleBold } from "react-icons/pi";
import { HiOutlineChartBar } from "react-icons/hi2";
import { BsPeople } from "react-icons/bs";
import { MdSignalWifi4BarLock } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import valorantlogo from "./../../assets/valorantlogo.png";
import dotalogo from "./../../assets/dota2logo.png";
import lollogo from "./../../assets/lollogo.png";
import tftlogo from "./../../assets/TFTlogo.png";
import lolchara1 from "./../../assets/lolchara1.png";
import lolchara2 from "./../../assets/lolchara2.png";
// stripe payment icon
import { FaCcVisa } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa6";
import { FaCcStripe } from "react-icons/fa";

const Home = () => {
  return (
    <main>
      <div className="w-full h-screen relative flex justify-center bg-background">
        <img src={background} alt="" className="w-full h-full" loading="lazy" />
        <div className="gradient-overlay"></div>
        <div className="absolute top-[40%] text-center">
          <h1 className=" leading-tight font-bold  text-main text-[50px]">
            The Best Elo Boosting Services
          </h1>
          <h1 className="text-main font-semibold my-[20px]">
            Ascend with Confidence: Unlock Your True Rank with Our Expert Elo
            Boosting
          </h1>
          <div className="flex justify-center hover:scale-110 transition ease-in delay-100">
            <button className="mt-[20px] gap-5 flex items-center font-bold px-[75px] py-[20px] rounded-2xl bg-button text-buttonText">
              <FaCartShopping className="text-[24px]" />
              Purchase Now
            </button>
          </div>
        </div>
      </div>
      <div className="h-auto w-full  bg-[#151921] py-[100px]  ">
        <h1 className="font-bold text-center text-[64px] tracking-widest mt-[-50px]    text-main ">
          SERVICES
        </h1>
        <p className="text-center text-[#75dab4] tracking-widest text-[24px] font-bold">
          CHOOSE SERVICES
        </p>
        <div className="cards  w-full mt-[75px] flex justify-center items-center gap-10">
          <div className="card red w-[275px] h-[275px] bg-background  ">
            <img src={valorantlogo} alt="" />
          </div>
          <div className="card red w-[275px] h-[275px] bg-background">
            <img src={lollogo} alt="" />
          </div>
          <div className="card red w-[275px] h-[275px] bg-background">
            <img src={dotalogo} className="w-[200px]" alt="" />
          </div>
          <div className="card red w-[275px] h-[275px] bg-background">
            <img src={tftlogo} alt="" />
          </div>
        </div>
        <div className="w-full mt-[200px] flex wrapper-customize justify-center  gap-5">
          <div className="text-center card-custom  shadow-md shadow-green-500/80   w-[400px] h-[250px] py-[20px] gap-4     text-white flex flex-col rounded-xl  items-center border border-highlight">
            <div className="w-[50px] h-[50px] rounded-full shadow-2xl  border border-highlight flex justify-center items-center">
              <FaCalendarCheck className="text-highlight text-[24px]" />
            </div>
            <h1 className="font-bold tracking-wide text-[18px]">
              Customize Your Order
            </h1>
            <p className="text-secondary text-[14px]">
              We have the most customizable elo boosting service out there so
              make sure to use our addons
            </p>
          </div>
          <div className="text-center card-custom w-[400px] h-[250px] py-[20px] gap-4  shadow-md shadow-green-500/80   text-white flex flex-col rounded-xl   items-center border border-highlight ">
            <div className="w-[50px] h-[50px] rounded-full   border border-highlight flex justify-center items-center">
              <FaCheck className="text-highlight text-[24px]" />
            </div>
            <h1 className="font-bold tracking-wide text-[18px]">
              Complete Payment
            </h1>
            <p className="text-secondary text-[14px]">
              We have a bunch payment providers so you can have multiple choice
              of payment
            </p>
          </div>
          <div className="text-center card-custom w-[400px] h-[250px] py-[20px] gap-4  shadow-md shadow-green-500/80   text-white flex flex-col  rounded-xl  items-center border border-highlight ">
            <div className="w-[50px] h-[50px] rounded-full   border border-highlight flex justify-center items-center">
              <BsCheck2All className="text-highlight text-[34px]" />
            </div>
            <h1 className="font-bold tracking-wide text-[18px]">
              Watch Your Account Rank Up
            </h1>
            <p className="text-secondary text-[14px]">
              Watch your account rank up and chat with our booster
            </p>
          </div>
        </div>
        <div className="flex gap-10 justify-center mt-[100px]">
          <FaCcStripe className="text-[100px] text-[#C4C4C4C4]" />
          <FaCcVisa className="text-[100px] text-[#C4C4C4C4]" />
          <FaApplePay className="text-[100px] text-[#C4C4C4C4]" />
          <FaCcMastercard className="text-[100px] text-[#C4C4C4C4]" />
          <FaGooglePay className="text-[100px] text-[#C4C4C4C4]" />
        </div>
      </div>
      <div className="w-full wrapper-chat h-screen bg-background flex px-[200px] items-center ">
        <div className="block w-[50%] lolchara1">
          <img src={lolchara1} alt="" className="block" />
        </div>
        <div className="w-[50%] wrapper-text h-full flex flex-col justify-center  gap-10 ">
          <div className="text-white flex gap-5 items-start bg-[#242629] p-[20px]  rounded-xl">
            <PiChatsCircleBold className="text-[40px] mt-[5px] text-highlight  max-w-[40px] max-h-[40px]" />
            <div>
              <h1 className="text-[24px] font-bold text-main tracking-wide ">
                Chat with your booster
              </h1>
              <p className="text-secondary font-semibold tracking-wide">
                Our Exclusive Live Chat Feature allows you to Maintain Direct
                Communication with Your Dedicated Booster throughout the Entire
                Elo Boosting Process.
              </p>
            </div>
          </div>
          <div className="text-white flex gap-5 items-start bg-[#242629] p-[20px] rounded-xl">
            <HiOutlineChartBar className="text-[40px] mt-[5px] text-highlight  max-w-[30px] max-h-[30px] " />
            <div>
              <h1 className="text-[24px] font-bold text-main">
                Track your order progress
              </h1>
              <p className="text-secondary font-semibold tracking-wide">
                You can see everything here. From your MMR gain per match, to
                the hero that your booster has played. It is all updated in
                real-time.
              </p>
            </div>
          </div>
          <div className="text-white flex gap-5 items-start bg-[#242629] p-[20px] rounded-xl">
            <BsPeople className="text-[40px] mt-[5px] text-highlight  max-w-[30px] max-h-[30px] " />
            <div>
              <h1 className="text-[24px] font-bold text-main">
                Manage your hero preferences
              </h1>
              <p className="text-secondary font-semibold tracking-wide">
                Let us know what heroes you usually play so we can fly under the
                radar, and give a nice boost to your hero statistics at the same
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-[#151921] py-[100px]">
        <h1 className="font-bold text-center text-[64px] tracking-widest  Guaranteed  text-main ">
          Guaranteed
        </h1>
        <p className="text-center text-[#75dab4] tracking-widest text-[24px] font-bold">
          BOOSTINGELO
        </p>
        <div className="wrapper-secure  flex  w-full h-full  px-[200px] mt-[100px] text-white">
          <div className="w-[50%] secure2  h-full flex flex-col gap-10    ">
            <div className="flex bg-[#242629] p-[20px] rounded-lg gap-5">
              <MdSignalWifi4BarLock className="text-highlight text-[50px]" />
              <div>
                <h1 className="text-[24px] font-bold">Secure Private Data</h1>
                <p className="text-secondary">
                  We use VPN protection to maximize LoL boost safety and 256 bit
                  SSL encryption to maximize client data security.
                </p>
              </div>
            </div>
            <div className="flex bg-[#242629] p-[20px] rounded-lg gap-5 ">
              <FaHandHoldingUsd className="text-highlight text-[50px]" />
              <div>
                <h1 className="text-[24px] font-bold">Refund Policy</h1>
                <p className="text-secondary">
                  Our refund policy gives more flexibility for clients. Buyers
                  are eligible to receive full or partial refunds according to
                  the progress.
                </p>
              </div>
            </div>
            <div className="flex bg-[#242629]  p-[20px] rounded-lg gap-5">
              <IoIosChatbubbles className="text-highlight text-[50px]" />
              <div>
                <h1 className="text-[24px] font-bold">24/7 Live Chat</h1>
                <p className="text-secondary">
                  Boostingelo's help center includes 24/7 live chat support and
                  phone assistance, offering any help related to your ELO boost.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[50%] lolchara2 flex justify-center ">
            <img src={lolchara2} alt="" className="" />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mt-[20px] gap-5 flex items-center font-bold px-[75px] py-[20px] rounded-2xl bg-button text-buttonText">
            <FaCartShopping className="text-[24px]" />
            Purchase Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;

// const ranks = {
//   'Bronze': [5, 6, 7, 8], // Prices for each division in Bronze
//   'Silver': [9, 10, 11, 12], // Prices for each division in Silver
//   // ... and so on for each rank
// };

// function calculatePrice(currentRank, currentDivision, desiredRank, desiredDivision) {
//   let totalCost = 0;
//   let processingRank = currentRank;
//   let processingDivision = currentDivision;

//   // Check if the upgrade is within the same rank
//   if (currentRank === desiredRank) {
//       for (let i = currentDivision; i < desiredDivision; i++) {
//           totalCost += ranks[processingRank][i - 1];
//       }
//       return totalCost;
//   }

//   // Calculate cost for different ranks
//   while (true) {
//       totalCost += ranks[processingRank][processingDivision - 1];

//       // Check if we've reached the desired rank and division
//       if (processingRank === desiredRank && processingDivision === desiredDivision) {
//           break;
//       }

//       // Move to the next division or rank
//       if (processingDivision < 4) {
//           processingDivision++;
//       } else {
//           processingDivision = 1;
//           let rankKeys = Object.keys(ranks);
//           processingRank = rankKeys[rankKeys.indexOf(processingRank) + 1];
//       }
//   }

//   return totalCost;
// }

// // Example usage
// let price = calculatePrice('Bronze', 1, 'Bronze', 3); // Current: Bronze 1, Desired: Bronze 3
// console.log(`The price for boosting is $${price}`);
