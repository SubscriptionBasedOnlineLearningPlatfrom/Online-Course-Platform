import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from 'react';
import Footer from "./Student/Components/Footer";
import {Routes, Route} from 'react-router-dom';
import DisplayCourse from "./Student/Pages/DisplayCourse";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/courses" element={<DisplayCourse />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
