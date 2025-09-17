
import React from 'react'; 
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx';
import './index.css';
import { PricingProvider } from "./Contexts/PricingConetxt.jsx";
import { APIProvider } from './Contexts/APIContext.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PricingProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </PricingProvider>
  </BrowserRouter>
);
