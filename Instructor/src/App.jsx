import { useState } from 'react'
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
import AddCourse from './components/course/addCourse';
import CurriculumPage from './pages/Curriculum';
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom';
import Pricing from './Pages/Pricing';
import ViewCreatedCourse from './Components/Courses/ViewCreatedCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Sidebar />
        <div className="ml-0 md:ml-64 lg:ml-72 p-6">
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} /> 
              <Route
                path="/courses/:courseId/curriculum"
                element={<CurriculumPage />}
              />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/courses" element={<ViewCreatedCourse />} />
          </Routes>
          {/*<LearnerFeedbackCarousel/>temporily added for testing - insert component to the correct position of the dashboard */}
        </div>
      </div>



  )
}

export default App
