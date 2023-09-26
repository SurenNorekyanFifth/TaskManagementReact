import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'

interface LoginModalProps {
    onLogin: (name: string, password: string) => Promise<void>;
    navigate:any
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin , navigate}) => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values: { name: string; password: string }) => {
        await onLogin(values.name, values.password);
        navigate('/task-page')
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <Formik
                    initialValues={{ name: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">
                                Name:
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700">
                                Password:
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Log In
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default LoginModal;
