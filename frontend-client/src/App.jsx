import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Test from "./components/Test";
import CreateResume from "./pages/CreateResume";
import Dashboard from "./pages/Dashboard";
import ResumeEditPage from "./pages/ResumeEditPage";
import Preview from "./pages/Preview";
import ResumeEditor from "./components/ResumeEditor";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css"; // Optional: for bubble theme
import QuillEditor from "./components/QuillEditor";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Test />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume/preview/:id" element={<Preview />} />
        {/* 
        <Route path="/resume/edit/:id" element={<ResumeEditPage />} />
        <Route path="/resume/create" element={<CreateResume />} /> */}

        <Route path="/resume/edit/:id" element={<ResumeEditor />} />
        <Route path="/resume/create" element={<ResumeEditor />} />
      </Routes>
      <QuillEditor />
    </div>
  );
};

export default App;
