import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Task, TaskList, User } from "../models/models";
import { LuSubtitles } from "react-icons/lu";
import { ImParagraphLeft } from "react-icons/im";
import { Field, Form, Formik } from "formik";
import { APIService } from "../APIService";
import { useAuth } from "../Context/AuthContext";
import { BsPersonAdd } from "react-icons/bs";

interface EditTaskModalProps {
  isEditTaskModalOpen: boolean;
  closeEditTaskModal: () => void;
  currentTask: Task | null;
  currentList: TaskList | null;
}
export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isEditTaskModalOpen,
  closeEditTaskModal,
  currentTask,
  currentList,
}) => {
  const { tasksList, setTasksList, usersList } = useAuth();
  const [selectedUsersArray, setSelectedUsersArray] = useState<string[]>([]);
  const [isAddUsersOpen, setIsAddUsersOpen] = useState<boolean>(false);

  const toggleUserSelection = (userId: string) => {
    if (selectedUsersArray.includes(userId)) {
      setSelectedUsersArray((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId),
      );
    } else {
      setSelectedUsersArray((prevSelectedUsers) => [
        ...prevSelectedUsers,
        userId,
      ]);
    }
  };

  const handleAddUsers = async () => {
    const updatedTask = {
      title: currentTask?.title,
      description: currentTask?.description,
      assignee: currentTask?.assignee,
      assigned: selectedUsersArray,
    };
    const response = await fetch(
      `http://localhost:3000/lists/${currentList?._id}/tasks/${currentTask?._id}/update-assigned`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      },
    );
    if (response.ok) {
      closeEditTaskModal();
      const newTasksList = await APIService.getAllListTasks();
      setTasksList(newTasksList);
    }
  };
  return (
    <Modal
      title="Edit task"
      open={isEditTaskModalOpen}
      onCancel={closeEditTaskModal}
      footer={null}
      width={800}
    >
      <div className="w-full flex flex-row">
        <div className="w-full flex flex-col py-4">
          <div className="w-full flex flex-row flex-wrap items-center">
            <p className="text-3xl">
              <LuSubtitles />
            </p>
            <p className="text-2xl font-bold mx-4">Title</p>
            <p className="w-full flex text-xl font-normal py-4">
              {currentTask?.title}
            </p>
          </div>

          <div className="w-full flex flex-row my-4">
            <Formik
              initialValues={{ description: currentTask?.description || "" }}
              onSubmit={async (values) => {
                const updatedTask = {
                  title: currentTask?.title,
                  description: values.description,
                  assignee: currentTask?.assignee,
                  assigned: currentTask?.assigned,
                };
                const response = await fetch(
                  `http://localhost:3000/lists/${currentList?._id}/tasks/${currentTask?._id}/update-description`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                  },
                );
                if (response.ok) {
                  closeEditTaskModal();
                  const newTasksList = await APIService.getAllListTasks();
                  setTasksList(newTasksList);
                }
              }}
            >
              <Form className="w-full">
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex flex-row items-center">
                    <ImParagraphLeft className="text-2xl" />
                    <p className="text-2xl font-bold mx-4">Description</p>
                  </div>
                  <Field
                    type="text"
                    name="description"
                    className="w-full text-lg px-5 py-5 my-4 bg-gray-200 rounded-sm"
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>

          <div className="w-full flex flex-col items-center">
            <p className="w-full text-xl px-2 py-4">Assigned Users</p>
            <div className="w-full flex flex-row text-lg px-2">
              {currentTask?.assigned.map((assignedUser) => (
                <div
                  className="flex flex-row items-center mx-2"
                  key={assignedUser._id}
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <p>{assignedUser.name}</p>
                </div>
              ))}
            </div>
            <p className="w-full flex flex-row items-center text-xl px-2 py-4 my-4">
              Assign other users
              <BsPersonAdd
                className="mx-2 cursor-pointer"
                onClick={() => setIsAddUsersOpen(!isAddUsersOpen)}
              />
            </p>
            {isAddUsersOpen ? (
              <div className="w-full flex flex-col">
                {usersList?.map((singleUser) => (
                  <div
                    key={singleUser._id}
                    className={`w-full flex flex-row my-2 cursor-pointer py-2 px-2 items-center font-bold text-lg ${
                      selectedUsersArray.includes(singleUser._id)
                        ? "bg-green-500"
                        : ""
                    }`}
                    onClick={() => toggleUserSelection(singleUser._id)}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                    <p>{singleUser.name}</p>
                  </div>
                ))}
                <button
                  className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded"
                  onClick={handleAddUsers}
                >
                  Add Users
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};
