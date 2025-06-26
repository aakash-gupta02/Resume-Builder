import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Test from "./components/Test";
import CreateResume from "./pages/CreateResume";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Test />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume/create" element={<CreateResume />} />
      </Routes>
    </div>
  );
};

export default App;
