import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';
// import AddCourse from './components/course/addCourse';
import ViewCreatedCourse from './Components/Course/ViewCreatedCourse';
import EnrollmentOverview from './Components/Enrollments/EnrollmentOverview';
import CurriculumPage from './pages/Curriculum';
import Pricing from './Pages/Pricing'
import QuizCreation from './Components/Quizes/QuizCreation';


function App() {
  const [count, setCount] = useState(0)

  return (

      <div>
        <Sidebar />
        <div className="ml-0 md:ml-30 lg:ml-40 mt-10 p-6">
          <Routes>
              {/* <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />  */}
              <Route
                path="/courses/:courseId/curriculum"
                element={<CurriculumPage />}
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/ViewCreatedCourse" element={<ViewCreatedCourse />} />
              {/* <Route path="/add-course" element={<AddCourse />} /> */}
              <Route path="/EnrollmentOverview" element={<EnrollmentOverview />} />
              <Route path="/QuizCreation" element={<QuizCreation />} /> 
              <Route path="/courses" element={<ViewCreatedCourse />} />      
          </Routes>
          {/*<LearnerFeedbackCarousel/>temporily added for testing - insert component to the correct position of the dashboard */}
        </div>
      </div>




  )
}

export default App