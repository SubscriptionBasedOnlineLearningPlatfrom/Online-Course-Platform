import React from 'react'; // ADD THIS
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import { CourseProvider } from './Student/Contexts/CourseContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <CourseProvider>
    <App />
  </CourseProvider>
    
  </BrowserRouter>
  // <React.StrictMode>
    
  // </React.StrictMode>

);
