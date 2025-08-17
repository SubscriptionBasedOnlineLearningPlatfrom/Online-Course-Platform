import Home from "./pages/Home.jsx";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import Footer from "./Student/Components/Footer";

import DisplayCourse from "./Student/Pages/DisplayCourse";
import DashBoard from "./Student/Pages/DashBoard";
import CourseProgress from "./Student/Components/Courses/CourseProgress";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Routes>
        {/* <Route path="/courses" element={<DisplayCourse />}></Route> --displaycourse is to show a single course when a course from courses is clicked*/}
        <Route path="/dashboard" element={<DashBoard />}></Route>

        <Route path="/courses" element={<Courses />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}

        <Route path="/courses/:courseId/progress" element={<CourseProgress />} />  {/* student progress of the logged in student*/}

      </Routes>
      <Footer />

    </>
  );
}

export default App;