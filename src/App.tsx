import React from "react";
import "./App.css";
import { Login } from "./pages/Login";
import AuthContextProvider from "./Context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/task-page" element={<TaskPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
