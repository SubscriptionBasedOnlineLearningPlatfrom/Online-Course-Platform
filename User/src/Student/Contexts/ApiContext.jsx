import React,{ createContext, useState } from "react";

// =======================
// PRIVATE API (with token)
// =======================
const api = axios.create({
  baseURL: "http://localhost:4000",
});


export const APIContext = createContext(); 

export const APIProvider = ({ children }) => {
    const BackendAPI = "http://localhost:4000/student";


// =======================
// PUBLIC API (no token)
// =======================
const publicApi = axios.create({
  baseURL: "http://localhost:4000",
});

publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// =======================
// API FUNCTIONS
// =======================
const getAllCourses = async () => {
  const response = await publicApi.get("/student/courses");
  return response.data;
};

// =======================
// CONTEXT
// =======================
const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const BackendAPI = "http://localhost:4000/student";

  return (
    <ApiContext.Provider
      value={{
        api,         // private API instance
        publicApi,   // public API instance
        BackendAPI,  // base URL for students
        getAllCourses,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Hook for easy access
export const useApi = () => useContext(ApiContext);

