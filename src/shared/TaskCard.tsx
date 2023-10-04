import { BiImages } from "react-icons/bi";
import React, { useEffect } from "react";
import { Task } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import { UserInfo } from "./UserInfo";

interface TaskCardProps {
  singleTask: Task;
  setCurrentTask: (task: Task | null) => void;
  openEditTaskModal: () => void;
  index: number;
}
export const TaskCard: React.FC<TaskCardProps> = ({
  singleTask,
  setCurrentTask,
  openEditTaskModal,
  index,
}) => {
  const dueTo = singleTask?.dueTo;
  const currentDate = new Date();
  const dueToDate = dueTo ? new Date(dueTo.date) : null;
  const isOverdue = dueToDate && dueToDate < currentDate;

  useEffect(() => {
    console.log(currentDate, "CURRENT DATE");
    console.log(dueTo, "DUE TO");
  }, []);

  return (
    <Draggable draggableId={singleTask._id} index={index} key={singleTask._id}>
      {(provided) => (
        <div
          className="w-full flex flex-col rounded-2xl bg-white p-4 items-start my-2 hover:bg-gray-200 duration-150 cursor-pointer"
          key={singleTask._id}
          onClick={() => {
            openEditTaskModal();
            setCurrentTask(singleTask);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-xl font-bold">{singleTask.title}</p>
          <p className="text-xl font-normal my-1 break-all text-start">
            {singleTask.description}
          </p>
          <div className="w-full flex flex-row">
            <div className="w-1/3 flex flex-row items-center text-2xl">
              {<BiImages className="cursor-pointer" />}
            </div>
            <div className="w-2/3 flex flex-row justify-end items-center">
              {singleTask.assigned.map((singleUser) => (
                <UserInfo user={singleUser} key={singleUser?._id} />
              ))}
            </div>
          </div>
          <div
            className={`w-full flex flex-row my-2 ${
              isOverdue ? "text-red-700" : "text-green-700"
            }`}
          >
            {isOverdue
              ? "Overdue"
              : dueTo
              ? `Due until: ${new Date(dueTo.date).toDateString()}`
              : ""}
          </div>
        </div>
      )}
    </Draggable>
  );
};
