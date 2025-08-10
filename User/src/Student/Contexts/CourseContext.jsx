import React, { createContext, useState } from 'react';
import axios from 'axios';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move fetchCourseDetails function to accept parameters
  const fetchCourseDetails = async (courseId, BackendUrl) => {
    if (!courseId || !BackendUrl) {
      console.error('Missing courseId or BackendUrl');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${BackendUrl}/courses/get_course_details/${courseId}`
      );
      const data = response.data;
      console.log("Course Data:", data);

      if (data.length === 0) {
        setCourse(null);
        setModules([]);
        return;
      }

      // Extract the course information from the response data
      const {
        course_image,
        course_title,
        course_description,
        category,
        price,
        language,
        instructor_name,
        instructor_image,
        instructor_rating,
        instructor_title,
        creation_date,
        last_update,
      } = data[0];

      setCourse({
        course_image,
        course_title,
        course_description,
        category,
        price,
        language,
        instructor_name,
        instructor_image,
        instructor_rating,
        instructor_title,
        creation_date,
        last_update,
      });

      // Extract unique modules
      const uniqueModules = data
        .filter((row) => row.module_id !== null)
        .reduce((acc, row) => {
          const existingModule = acc.find(
            (m) => m.module_id === row.module_id
          );
          if (!existingModule) {
            acc.push({
              module_id: row.module_id,
              module_title: row.module_title,
              module_order: row.module_order,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => a.module_order - b.module_order);

      setModules(uniqueModules);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourse(null);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseContext.Provider 
      value={{ 
        course,
        setCourse,
        modules, 
        setModules,
        loading,
        setLoading,
        fetchCourseDetails 
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;