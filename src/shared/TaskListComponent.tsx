import React, { useEffect, useState } from "react";
import { GrChapterAdd } from "react-icons/gr";
import { Task, TaskList } from "../models/models";
import { AddCardModal } from "../modals/AddCardModal";
import { EditTaskModal } from "../modals/EditTaskModal";
import { useAuth } from "../Context/AuthContext";
import { TaskCard } from "./TaskCard";

interface TaskProps {
  index: number;
  currentList: TaskList;
}
export const TaskListComponent: React.FC<TaskProps> = ({ currentList }) => {
  const { tasksList } = useAuth();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [localList, setLocalList] = useState<TaskList | null>(null);
  useEffect(() => {
    setLocalList(currentList);
  }, []);
  useEffect(() => {
    setLocalList(currentList);
    console.log("TaskListComponent taskList updated");
  }, [tasksList]);

  const openAddCardModal = () => {
    setIsAddCardModalOpen(true);
  };

  const closeAddCardModal = () => {
    setIsAddCardModalOpen(false);
  };
  const openEditTaskModal = () => {
    setIsEditTaskModalOpen(true);
  };
  const closeEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const handleSubmit = async (
    values: {
      title: any;
      description: any;
      assigneeId: any;
      assignedId: any;
    },
    { resetForm }: any
  ) => {
    const payload = {
      title: values.title,
      description: values.description,
      assigneeId: String(values.assigneeId),
      assignedId: String(values.assignedId),
    };
    const response = await fetch(
      `http://localhost:3000/lists/${currentList._id}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      resetForm();
      closeAddCardModal();
      const updatedResponse = await fetch(
        `http://localhost:3000/lists/${currentList._id}`
      );
      if (updatedResponse.ok) {
        const updatedList = await updatedResponse.json();
        setLocalList(updatedList);
      }
    }
  };

  return (
    <>
      <div className="w-11/12 flex flex-col">
        <div className="w-full flex flex-row p-4">
          <p className="text-xl font-bold">{currentList.name}</p>
        </div>

        {localList?.Tasks.map((singleTask, index) => (
          <TaskCard
            singleTask={singleTask}
            setCurrentTask={setCurrentTask}
            openEditTaskModal={openEditTaskModal}
            key={singleTask._id}
            index={index}
          />
        ))}

        <div
          className="w-full flex flex-row justify-start py-8"
          onClick={openAddCardModal}
        >
          <div className="w-[10%] flex flex-row justify-center items-center text-xl">
            {<GrChapterAdd className="cursor-pointer" />}
          </div>
          <p className="text-xl cursor-pointer">Add a card</p>
        </div>
      </div>

      <AddCardModal
        isAddCardModalOpen={isAddCardModalOpen}
        closeAddCardModal={closeAddCardModal}
        handleSubmit={handleSubmit}
      />
      <EditTaskModal
        isEditTaskModalOpen={isEditTaskModalOpen}
        closeEditTaskModal={closeEditTaskModal}
        currentTask={currentTask}
        currentList={currentList}
      />
    </>
  );
};
