import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import the Toaster
import Home from "./Student/Pages/Home";
import Navbar from "./Student/Components/Navbar";
import Footer from "./Student/Components/Footer";
import Courses from "./Student/Pages/Courses";
import DisplayCourse from "./Student/Pages/DisplayCourse";
import DashBoard from "./Student/Pages/DashBoard";
import CourseProgress from "./Student/Components/Courses/CourseProgress";
import CertificatePage from "./Student/Pages/Certificate";

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

        <Route path="/courses" element={<Courses />} /> {/* this is a page to display all courses which are visible to public users who are not logged in */}

        <Route path="/courses/:courseId/progress" element={<CourseProgress />} />  {/* student progress of the logged in student*/}
        <Route path="/certificate/:courseId" element={<CertificatePage />} />

        <Route path="/displayCourses" element={<DisplayCourse />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;