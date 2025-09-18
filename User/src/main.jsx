import React from "react"; // ADD THIS
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CourseProvider } from "./Student/Contexts/CourseContext.jsx";
import { APIProvider } from "./Student/Contexts/APIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CourseProvider>
      <APIProvider>
        <App />
      </APIProvider>
      
    </CourseProvider>
  </BrowserRouter>
);
