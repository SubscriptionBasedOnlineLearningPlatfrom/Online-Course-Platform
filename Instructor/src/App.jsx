import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'; 
import { Route, Routes } from 'react-router-dom';
import Pricing from './Pages/Pricing';
import ViewCreatedCourse from './Components/Courses/ViewCreatedCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ViewCreatedCourse" element={<ViewCreatedCourse />} />

      </Routes>
    </>
  )
}

export default App
