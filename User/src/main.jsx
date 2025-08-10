import React from "react"; // ✅ ADD THIS
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import APIContext, { APIProvider } from "./Student/Contexts/APIContext";
import { CourseProvider } from "./Student/Contexts/CourseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <APIProvider>
    <CourseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CourseProvider>
  </APIProvider>

  // <React.StrictMode>

  // </React.StrictMode>
);
