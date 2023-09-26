import { Modal } from "antd";
import { Field, Form, Formik } from "formik";
import React from "react";

interface AddCardModalProps {
  isAddCardModalOpen: boolean;
  closeAddCardModal: () => void;
  handleSubmit: (
    values: { title: any; description: any; assigneeId: any; assignedId: any },
    { resetForm }: any
  ) => Promise<void>;
}
export const AddCardModal: React.FC<AddCardModalProps> = ({
  isAddCardModalOpen,
  closeAddCardModal,
  handleSubmit,
}) => {
  const initialValues = {
    title: "",
    description: "",
    assigneeId: "",
    assignedId: "",
  };
  return (
    <Modal
      title="Create a New Task List"
      open={isAddCardModalOpen}
      onCancel={closeAddCardModal}
      footer={null}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="w-full flex flex-row flex-wrap">
            <label
              htmlFor="title"
              className="w-full flex flex-row justify-start p-1 my-1"
            >
              Task Name:
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full border-2 p-1 rounded-lg"
            />
            <label
              htmlFor="description"
              className="w-full flex flex-row justify-start p-1 my-1"
            >
              Task description:
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              className="w-full border-2 p-1 rounded-lg"
            />

            <label
              htmlFor="assigneeId"
              className="w-full flex flex-row justify-start p-1 my-1"
            >
              Task assigneeId:
            </label>
            <Field
              type="text"
              id="assigneeId"
              name="assigneeId"
              className="w-full border-2 p-1 rounded-lg"
            />

            <label
              htmlFor="assignedId"
              className="w-full flex flex-row justify-start p-1 my-1"
            >
              Task assignedId:
            </label>
            <Field
              type="text"
              id="assignedId"
              name="assignedId"
              className="w-full border-2 p-1 rounded-lg"
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <button type="submit">Create</button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};
