import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'; 
import LearnerFeedbackCarousel from './components/LearnerFeedbackCarousel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <LearnerFeedbackCarousel/> {/* temporily added for testing - insert component to the correct position of the page */}
    </>
  )
}

export default App
