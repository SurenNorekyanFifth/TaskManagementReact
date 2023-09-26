import { BsCalendar4, BsGlobeAmericas, BsGraphUp } from "react-icons/bs";
import React from "react";
import { CgMenuMotion } from "react-icons/cg";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

export const LeftSideBar = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex flex-col items-center">
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<CgMenuMotion className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<BsGraphUp className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<BsCalendar4 className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<HiOutlineBellAlert className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<FaDollarSign className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8">
          {<BsGlobeAmericas className="cursor-pointer" />}
        </div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8"></div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-8"></div>
        <div className="w-full flex flex-row justify-center items-center text-4xl py-16">
          {<AiOutlineDelete className="cursor-pointer" />}
        </div>
      </div>
    </div>
  );
};
