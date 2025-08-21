import { useState } from "react";
import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Student/Components/Navbar.jsx";
import Footer from "./Student/Components/Footer";
import Home from "./Student/Pages/Home.jsx"; 
import DisplayCourse from "./Student/Pages/DisplayCourse";
import DashBoard from "./Student/Pages/DashBoard";
import Courses from "./Student/Pages/Courses";
import CourseProgress from "./Student/Components/Courses/CourseProgress";
import { QuizComponent } from '../../User/src/Student/Components/Quizes/Quiz';



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/courses" element={<DisplayCourse />}></Route> --displaycourse is to show a single course when a course from courses is clicked*/}
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/courses" element={<Courses />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}
        <Route path="/courses/:courseId/progress" element={<CourseProgress />} />  {/* student progress of the logged in student*/}
        <Route path="/displayCourses" element={<DisplayCourse />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}
        <Route path="/QuizComponent" element={<QuizComponent />} />
        
      </Routes>
      <Footer />

    </>
  );
}

export default App;