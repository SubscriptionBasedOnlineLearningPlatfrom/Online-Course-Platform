// import Home from "./pages/Home.jsx";
import { useState } from "react";

import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Courses from "./Student/Pages/Courses";
import Footer from "./Student/Components/Footer";
import Home from "./Student/Pages/Home.jsx"; 

import DisplayCourse from "./Student/Pages/DisplayCourse";
import DashBoard from "./Student/Pages/DashBoard";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/displaycourses" element={<DisplayCourse />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>

        <Route path="/courses" element={<Courses />} /> 

      </Routes>
      <Footer />

    </>
  );
}

export default App;