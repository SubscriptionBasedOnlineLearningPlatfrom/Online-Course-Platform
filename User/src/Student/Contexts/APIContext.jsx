import React,{ createContext, useState } from "react";


export const APIContext = createContext(); 

export const APIProvider = ({ children }) => {
    const BackendAPI = "http://localhost:4000/student";

    return (
        <APIContext.Provider value={{ BackendAPI }}>
            {children}
        </APIContext.Provider>
    );
}

