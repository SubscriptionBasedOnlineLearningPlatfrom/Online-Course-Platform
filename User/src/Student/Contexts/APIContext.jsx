import React from 'react'
import { createContext } from 'react'

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const BackendUrl = 'http://localhost:4000'; // Replace with your API URL
    return (
        <APIContext.Provider value={{ BackendUrl }}>
            {children}
        </APIContext.Provider>
    );
  
}

export default APIContext;