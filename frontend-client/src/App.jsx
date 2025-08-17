import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import ResumeEditor from "./components/ResumeEditor";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import "quill/dist/quill.snow.css";
import TemplateRenderer from "./components/TemplateRenderer";
import PuppetPreview from "./pages/PuppetPreview";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume/preview/:id" element={<Preview />} />
        <Route path="/resume/puppeteer/:id" element={<PuppetPreview />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume/edit/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ResumeEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ResumeEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
