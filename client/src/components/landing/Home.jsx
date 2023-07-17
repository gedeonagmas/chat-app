import React, { useEffect, useState } from "react";
import Group from "@mui/icons-material/Group";
import Fire from "@mui/icons-material/LocalFireDepartment";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import Linkedin from "@mui/icons-material/LinkedIn";
import Email from "@mui/icons-material/Email";
import Git from "@mui/icons-material/GitHub";
import Telegram from "@mui/icons-material/Telegram";
import Person from "@mui/icons-material/Person";
import Phone from "@mui/icons-material/PhoneAndroid";
const Home = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  return (
    <div className="items-center text-gray-500 justify-center h-auto w-[100%] flex flex-col">
      <Footer />
      <div className="text-3xl font-extrabold flex gap-2 items-center justify-center bg-white h-[100vh] px-[7%] w-[100%] ">
        <div className="h-[100%] font-extrabold text-4xl lg:text-5xl  flex flex-col flex-[40%] items-center justify-center">
          <div className="w-[90%] md:w-[85%] md:text-3xl lg:text-4xl xl:text-5xl lg:w-[90%] text-black flex flex-col gap-3">
            <p className="">
              <span className="text-[#00aeff]">Connect</span> with
            </p>
            <p className="">your circle in a</p>
            <p className="">fun way!!</p>
            <p className="text-sm text-gray-600 mt-5 font-bold">
              Stay connected with your loved ones, friends, family, and schoolmates effortlessly and enjoyably using
              this chat application. With a plethora of features.
            </p>
            <div className="flex text-lg md:gap-3 sm:text-sm gap-10 lg:gap-5 mt-8">
              <button
                onClick={() => setLogin(true)}
                className="px-6 text-lg hover:text-gray-200 h-12 rounded-md text-white bg-[#00aeff]"
              >
                Log in
              </button>
              <button
                onClick={() => setSignup(true)}
                className="px-4 h-12 text-lg rounded-md text-black border-2 border-black hover:bg-black hover:text-white duration-300 bg-white"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="h-[100%] hidden md:flex flex-col flex-[60%] bg-white items-center justify-center">
          <img src="./phone.jpg" alt="chat" className="w-[100%] h-[100%]" />
        </div>
        {login && <Login setLogin={setLogin} />}
        {signup && <Signup setSignup={setSignup} />}
      </div>
      <div className="text-3xl font-extrabold flex flex-col gap-2 bg-white h-auto px-[10%] w-[100%] ">
        <p className="text-xl font-bold text-gray-800 py-2">Highlight Features</p>
        <div className="h-auto gap-y-10 py-2 w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center px-5 bg-white">
          <div className="flex hover:scale-[1.2] hover:duration-200 flex-col items-center justify-center gap-2 h-[90%]">
            <img src="./pp1.avif" alt="user" className="h-40 w-44 rounded-2xl" />
            <p className="text-lg text-black font-bold">Private Chat</p>
          </div>
          <div className="flex hover:scale-[1.2] hover:duration-200 flex-col items-center justify-center gap-2 h-[90%] w-auto">
            <img src="./gg1.jpg" alt="user" className="h-40 w-44 rounded-2xl" />
            <p className="text-lg text-black font-bold">Group Chat</p>
          </div>
          <div className="flex hover:scale-[1.2] hover:duration-200 flex-col items-center justify-center gap-2 h-[90%] w-auto">
            <img src="./manage1.webp" alt="user" className="h-40 w-44 rounded-2xl" />
            <p className="text-lg text-black font-bold">Manage your Group</p>
          </div>
          <div className="flex hover:scale-[1.2] hover:duration-200 flex-col items-center justify-center gap-2 h-[90%] w-auto">
            <img src="./multi.webp" alt="user" className="h-40 w-44 rounded-2xl" />
            <p className="text-lg text-black font-bold">Multimedia file share</p>
          </div>
        </div>
      </div>
      <div className="text-xs md:text-sm font-bold md:font-extrabold flex mt-32 flex-col gap-2 bg-[#00aeff] text-white h-auto py-5 items-center justify-center px-[10%] w-[100%]">
        <p className="text-lg font-extrabold">Contact Me</p>
        <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40%] gap-y-4">
          <div className="flex hover:scale-110 justify-start duration-150 w-56 gap-3">
            <Email />
            <a target="_blank" href="mailto:gedeonagmas2580@gmail.com" className="hover:underline">
              gedeonagmas2580@gmail.com
            </a>
          </div>
          <div className="flex hover:scale-110 justify-start duration-150 w-56 gap-3">
            <Git />
            <a target="_blank" href="https://www.github.com/gedeonagmas" className="hover:underline">
              www.github.com/gedeonagmas
            </a>
          </div>
          <div className="flex hover:scale-110 justify-start duration-150 w-56 gap-3">
            <Linkedin />
            <a target="_blank" href="https://www.linkedin.com/in/gedionagmas/" className="hover:underline">
              linkedin.com/in/gedionagmas
            </a>
          </div>
          <div className="flex items-center justify-start hover:scale-110 w-56  duration-150 gap-3">
            <Telegram />
            <a target="_blank" href="https://t.me/gedi3777" className="hover:underline">
              https://www.t.me/@gedi3777
            </a>
          </div>
          <div className="flex items-center justify-start hover:scale-110 w-56  duration-150 gap-3">
            <Person />
            <a target="_blank" href="https://gedion.vercel.app" className="hover:underline">
              https://gedion.vercel.app
            </a>
          </div>
          <div className="flex items-center justify-start hover:scale-110 w-56  duration-150 gap-3">
            <Phone />
            <p className="hover:underline w-56">+251 954104637</p>
          </div>
        </div>
        <p className="text-sm mt-8">All Rights are Reserved @2023</p>
      </div>
    </div>
  );
};

export default Home;
