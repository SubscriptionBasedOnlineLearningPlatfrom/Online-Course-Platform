import React, { createContext, useContext } from "react";
import axios from "axios";

// =======================
// PRIVATE API
// =======================
const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// =======================
// PUBLIC API
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




const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{
        api,
        publicApi,
        getAllCourses, // as a function to children
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
