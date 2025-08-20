import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import React from 'react'; 
import AddCourse from './components/course/addCourse';
import Pricing from './Pages/Pricing';
import ViewCreatedCourse from './Components/Course/ViewCreatedCourse';
import EnrollmentOverview from './Components/Enrollments/EnrollmentOverview';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Routes>
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ViewCreatedCourse" element={<ViewCreatedCourse />} />
        <Route path="/EnrollmentOverview" element={<EnrollmentOverview />} />
      </Routes>
    </>
  )
}

export default App
