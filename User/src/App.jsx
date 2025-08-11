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


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} /> 
        <Route path="/courses" element={<Courses />} /> 
      </Routes>

    </>
  );
}

export default App;