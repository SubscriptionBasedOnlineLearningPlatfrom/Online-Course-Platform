import { useState } from 'react'
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
import CurriculumPage from './pages/Curriculum';
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom';
import AddCourse from './components/course/addCourse'
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
        <Route path="/courses/:courseId/curriculum" element={<CurriculumPage />} />
        <Route path="/courses" element={<ViewCreatedCourse />} />        
      </Routes>
  </>
  )
}

export default App