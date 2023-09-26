import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "antd";

export const NewList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    name: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const payload = {
        name: values.name,
        Tasks: [],
      };

      const response = await fetch("http://localhost:3000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        resetForm();
        closeModal();
      } else {
        console.error("Failed to create a new task list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <button onClick={openModal} className="w-2/3 p-8 bg-gray-300 rounded-3xl">
        Add another list
      </button>

      <Modal
        title="Create a New Task List"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="w-full flex flex-row flex-wrap">
              <label
                htmlFor="name"
                className="w-full flex flex-row justify-start p-1"
              >
                List Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full border-2 p-1 rounded-lg"
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <button type="submit">Create</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
