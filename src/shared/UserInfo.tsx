import { Task, User } from "../models/models";
import React from "react";

interface UserInfoProps {
  user: User;
  width?: string; // Optional width prop
  height?: string; // Optional height prop
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  width = "8",
  height = "8",
}) => {
  return (
    <div
      className={`flex flex-row items-center justify-center w-${width} h-${height} bg-gray-300 rounded-full cursor-pointer mx-1`}
      key={user._id}
    >
      {user?.name ? user.name.charAt(0) : ""}
    </div>
  );
};
