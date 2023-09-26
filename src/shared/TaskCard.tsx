import { BiImages } from "react-icons/bi";
import React from "react";
import { Task } from "../models/models";
import { Draggable } from "react-beautiful-dnd";

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
            <div className="w-1/2 flex flex-row items-center text-2xl">
              {<BiImages className="cursor-pointer" />}
            </div>
            <div className="w-1/2 flex flex-row justify-end items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
