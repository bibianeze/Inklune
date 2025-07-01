import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";
import AuthProvider from "./context/AuthContext.jsx";
import BlogProvider from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>
        <App />
        <ToastContainer position="top-center" autoClose={8000} />
      </BlogProvider>
    </AuthProvider>
  </StrictMode>
);
