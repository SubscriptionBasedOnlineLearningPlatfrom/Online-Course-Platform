import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
import AddCourse from './components/course/addCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>

      <LearnerFeedbackCarousel/> {/* temporily added for testing - insert component to the correct position of the page */}
    </>
  )
}

export default App
