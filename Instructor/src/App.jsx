import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
import AddCourse from './components/course/addCourse';
import { Route, Routes } from 'react-router-dom';
import Pricing from './Pages/Pricing';
import ViewCreatedCourse from './Components/Courses/ViewCreatedCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Routes>
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ViewCreatedCourse" element={<ViewCreatedCourse />} />
      </Routes>
    </>
  )
}

export default App
