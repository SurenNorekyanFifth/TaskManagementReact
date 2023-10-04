import React, { useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import { GrChapterAdd } from "react-icons/gr";
import { useAuth } from "../Context/AuthContext";
import { APIService } from "../APIService";
import { UserInfo } from "./UserInfo";

export const Menu = () => {
  const { user, usersList, fetchPosts } = useAuth();
  useEffect(() => {
    if (fetchPosts) {
      fetchPosts();
    }
  }, []);
  return (
    <div className="w-full flex flex-row items-center py-6">
      <div className="w-1/3 flex flex-row items-center ">
        <div className="w-1/4 flex flex-row justify-center items-center text-5xl">
          {<BsListTask className="cursor-pointer" />}
        </div>
        <div className="w-3/4 flex flex-row">
          <p className="w-1/2 flex flex-row justify-start items-center text-4xl font-bold cursor-pointer">
            Projects
          </p>
          <p className="w-1/2 flex flex-row justify-start items-center text-4xl font-bold text-gray-400 cursor-pointer">
            Templates
          </p>
        </div>
      </div>
      <div className="w-1/3 flex flex-row items-center "></div>
      <div className="w-1/3 flex flex-row border-r-2 items-center justify-end ">
        <div className="w-1/2 flex flex-row justify-end items-center text-5xl px-8">
          {<GrChapterAdd className="cursor-pointer" />}
        </div>
        <div className="w-1/2 flex flex-row justify-center items-center text-5xl mx-8">
          <p className="text-2xl pr-4">{user?.name}</p>
          {user ? <UserInfo user={user} width={"16"} height={"16"} /> : null}
        </div>
      </div>
    </div>
  );
};
