import { Modal } from "antd";
import React, { useEffect } from "react";
import { Task, TaskList } from "../models/models";
import { LuSubtitles } from "react-icons/lu";
import { ImParagraphLeft } from "react-icons/im";
import { Field, Form, Formik } from "formik";
import { APIService } from "../APIService";
import { useAuth } from "../Context/AuthContext";

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
  const { tasksList, setTasksList } = useAuth();
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
                  }
                );
                if (response.ok) {
                  closeEditTaskModal();
                  const newTasksList = await APIService.getAllListTasks();
                  console.log(newTasksList);
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
            <p className="w-full text-lg px-2 py-4">Assigned Users</p>
            <div className="w-full text-lg px-2">
              {currentTask?.assigned.map((assignedUser) => (
                <div
                  className="flex flex-row items-center"
                  key={assignedUser._id}
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <p>{assignedUser.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
