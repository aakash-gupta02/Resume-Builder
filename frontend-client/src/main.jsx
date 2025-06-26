import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </BrowserRouter>
  </AuthProvider>
);
