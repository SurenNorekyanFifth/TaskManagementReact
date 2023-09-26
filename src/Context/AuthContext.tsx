import React, { createContext, useState, useContext, ReactNode } from "react";
import { Task, TaskList, User } from "../models/models";
import { APIService } from "../APIService";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  usersList: User[] | null;
  setUsersList: (usersList: User[] | null) => void;
  tasksList: TaskList[] | null;
  setTasksList: (taskList: TaskList[] | null) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
  handleLogin?: (name: string, password: string) => Promise<void>;
  fetchPosts?: () => Promise<void>;
  getAllListTasks?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  usersList: null,
  setUsersList: () => {},
  tasksList: null,
  setTasksList: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
  fetchPosts: () => Promise.resolve(),
  getAllListTasks: () => Promise.resolve(),
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[] | null>(null);
  const [taskLists, setTaskLists] = useState<TaskList[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (name: string, password: string) => {
    try {
      const response = await APIService.loginRequest(name, password);
      const accessToken = response.access_token;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      alert("User not found");
      console.log("Error:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const profileResponse = await APIService.getProfile();
      console.log(localStorage.getItem("accessToken"));
      if (profileResponse) {
        try {
          if (profileResponse) {
            const customerResponse = await APIService.getCustomers();
            if (customerResponse) {
              setErrorMessage(null);
              setUsersList(customerResponse);
              const foundCustomer = customerResponse.find(
                (customer: { name: string }) =>
                  customer.name === profileResponse.name
              );
              if (foundCustomer) setUser(foundCustomer);
              else console.log("Customer not found in customers list");
            }
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("An error occurred while fetching data");
        }
      } else if (profileResponse.status === 401) {
        console.log(
          "Unauthorized: Please log in again or refresh the access token."
        );
        setErrorMessage(
          "Unauthorized: Please log in again or refresh the access token."
        );
      } else {
        console.log("Error fetching profile:", profileResponse.statusText);
        setErrorMessage(profileResponse.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getAllListTasks = async () => {
    const taskListResponse = await APIService.getAllListTasks();
    // console.log(taskListResponse, "TASKS LIST RESPONSE");
    if (taskListResponse) {
      setTaskLists(taskListResponse);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        usersList: usersList,
        setUsersList: setUsersList,
        tasksList: taskLists,
        setTasksList: setTaskLists,
        errorMessage: errorMessage,
        setErrorMessage: setErrorMessage,
        handleLogin,
        fetchPosts,
        getAllListTasks: getAllListTasks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
