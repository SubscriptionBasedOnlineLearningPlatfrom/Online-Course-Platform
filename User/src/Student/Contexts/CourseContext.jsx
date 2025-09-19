import React, { createContext, useState } from "react";
import axios from "axios";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const fetchCourseDetails = async (BackendAPI, courseId) => {
    const response = await axios.get(`${BackendAPI}/courses/${courseId}`);
    if (response.status === 200) {
      setCourse(response.data.course);
      setModules(response.data.modules || []);
      setCategory(response.data.course.category);
    }
  };

  const fetchRelatedCourses = async (BackendAPI,category) => {
        try {
          if (!category) return;
          const response = await axios.get(`${BackendAPI}/courses/related-courses/${category}`);
          console.log(response);
          if (response.status === 200) {
            setRelatedCourses(response.data.courses);
          } 
          console.log("Related courses fetched:", response.data.courses);
        } catch (error) {
          console.error("Error fetching related courses:", error);
        }
      };

  return (
    <CourseContext.Provider value={{ enrolled, setEnrolled, modules, setModules, course, setCourse,relatedCourses, setRelatedCourses, fetchCourseDetails, fetchRelatedCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
