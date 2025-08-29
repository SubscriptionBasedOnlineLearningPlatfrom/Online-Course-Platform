import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import CourseModules from "./CourseModules";
import { CourseContext } from "../../Contexts/CourseContext";


const CourseDetails = () => {
//   const { courseId } = useParams();
//   const { BackendUrl } = useContext(APIContext);
//   const {
//     course,
//     setCourse,
//     modules,
//     setModules,
//     loading,
//     setLoading,
//     fetchCourseDetails,
//   } = useContext(CourseContext);

    const [loading, setLoading] = useState(true);
    const [modules,setModules] = useState([]);
    const [course, setCourse] = useState(null);
    const { enrolled, setEnrolled } = useContext(CourseContext);

    const navigate = useNavigate();
    console.log(enrolled);

  // Dummy course data
  const dummyCourse = {
    course_id: "1",
    course_title: "Complete Web Development Bootcamp",
    course_description: "Learn full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and master modern web technologies.",
    course_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=1000&q=80",
    category: "Web Development",
    price: "99.99",
    language: "English",
    instructor_name: "John Smith",
    instructor_title: "Senior Full-Stack Developer",
    instructor_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80",
    instructor_rating: "4.8",
    creation_date: "2024-01-15T10:30:00Z",
    last_update: "2024-07-20T14:45:00Z"
  };

  

  useEffect(() => {
    // Set loading to true initially
    setLoading(true);
    
    // Simulate API loading delay
    setTimeout(() => {
      setCourse(dummyCourse);
      setLoading(false);
    }, 1000);

    // COMMENTED OUT: Original data fetching code
    // if (courseId && BackendUrl) {
    //   // Pass both courseId and BackendUrl as parameters
    //   fetchCourseDetails(courseId, BackendUrl);
    // }
  }, []);
  // Note: Removed fetchCourseDetails from dependency array since we're not using it

  // Function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to format price
  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toFixed(2)}` : "Free";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Course not found state (This shouldn't happen with dummy data, but keeping for completeness)
  if (!course) {
    return (
      <div className="text-center mt-20">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Course Not Found
        </h2>
        <p className="text-gray-500">
          The course you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 md:col-span-2">
            <div className="md:flex">
              {/* Course Image */}
              <div className="md:w-1/3">
                <img
                  src={
                    course.course_image ||
                    "https://images.unsplash.com/photo-1549924231-f129b911e442?fit=crop&w=1000&q=80"
                  }
                  alt={course.course_title || "Course Image"}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="md:w-2/3 p-8">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category || "General"}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {course.course_title}
                </h1>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {course.course_description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(course.price)}
                    </div>
                    <div className="text-sm text-gray-500">Course Price</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {course.language || "English"}
                    </div>
                    <div className="text-sm text-gray-500">Language</div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {course.instructor_image ? (
                        <img
                          src={course.instructor_image}
                          alt={course.instructor_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div>
                          {course.instructor_name?.charAt(0).toUpperCase() || "I"}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {course.instructor_name || "Not Assigned"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {course.instructor_title || "Instructor"}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {course.instructor_rating || "No rating"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Course Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900 font-medium">
                    {formatDate(course.creation_date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-gray-900 font-medium">
                    {formatDate(course.last_update)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modules</span>
                  <span className="text-gray-900 font-medium">
                    {modules.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-xl mb-2">
                Ready to start learning?
              </h3>
              <p className="text-blue-100 mb-4">
                Join thousands of students already enrolled in this course.
              </p>
              <button onClick={() => {setEnrolled(true), navigate("/subscription")}} className={`w-full bg-white text-[#0173d1] font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${enrolled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Enroll Now - {formatPrice(course.price)}
              </button>
            </div>
          </div>
        </div>

        <CourseModules />
      </div>
    </div>
  );
};

export default CourseDetails;