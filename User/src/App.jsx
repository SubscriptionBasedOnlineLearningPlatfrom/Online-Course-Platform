import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import the Toaster
import "./App.css";

import Home from "./Student/Pages/Home";
import Navbar from "./Student/Components/Navbar";
import Footer from "./Student/Components/Footer";
import Courses from "./Student/Pages/Courses";
import DisplayCourse from "./Student/Pages/DisplayCourse";
import DashBoard from "./Student/Pages/DashBoard";
import CourseProgress from "./Student/Components/DashBoard/CourseProgress";
import CertificatePage from "./Student/Pages/Certificate";
import { QuizComponent } from '../../User/src/Student/Components/Quizes/Quiz';
import CourseContentPage from "./Student/Components/DashBoard/CourseContentPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Toaster richColors position="top-center" /> {/* Add the Toaster component here */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/courses" element={<DisplayCourse />}></Route> --displaycourse is to show a single course when a course from courses is clicked*/}
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/courses" element={<Courses />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}

        <Route path="/courses/:courseId/progress" element={<CourseProgress />} />  {/* student progress of the logged in student*/}
        <Route path="/certificate/:courseId" element={<CertificatePage />} />

        <Route path="/displayCourses" element={<DisplayCourse />} />
        <Route path="/courses/:courseId/content" element={<CourseContentPage />} />  {/* student progress of the logged in student*/}
        <Route path="/displayCourses" element={<DisplayCourse />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}
        <Route path="/QuizComponent" element={<QuizComponent />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;