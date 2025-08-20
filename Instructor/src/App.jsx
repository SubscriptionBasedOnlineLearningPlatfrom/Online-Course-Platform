import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
import AddCourse from './components/course/addCourse';
import CurriculumPage from './pages/Curriculum';
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Sidebar />
        <div className="ml-0 md:ml-64 lg:ml-72 p-6">
          <Routes>
  {/*         <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses/add" element={<AddCourse />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/students" element={<Students />} /> */}
              <Route
                path="/courses/:courseId/curriculum"
                element={<CurriculumPage />}
              />
          </Routes>
          {/*<LearnerFeedbackCarousel/>temporily added for testing - insert component to the correct position of the dashboard */}
        </div>
      </div>


  )
}

export default App
