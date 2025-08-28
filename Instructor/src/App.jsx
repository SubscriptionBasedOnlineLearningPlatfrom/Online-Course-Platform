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
import CommentsReplies from './Components/Comments/CommentsReplies';


function App() {
  const [count, setCount] = useState(0)

  return (

      <div className='flex min-h-screen'>
        <aside className="w-72 flex-none border-r overflow-y-auto">
          <div className='w-full h-full'>
            <Sidebar />
          </div>
          
        </aside>
        
        <main className="flex-1 overflow-y-auto p-6">
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
              <Route path="/CommentsReplies" element={<CommentsReplies />} />      
          </Routes>
          {/*<LearnerFeedbackCarousel/>temporily added for testing - insert component to the correct position of the dashboard */}
        </main>
      </div>




  )
}

export default App