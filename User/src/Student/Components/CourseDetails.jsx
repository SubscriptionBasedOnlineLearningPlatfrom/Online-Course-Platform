import React, { useContext, useEffect } from "react";
import APIContext from "../Contexts/APIContext";
import { useParams } from "react-router-dom";
import CourseContext from "../Contexts/CourseContext";
import Modules from "./Modules";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { BackendUrl } = useContext(APIContext); // Fixed: Added destructuring
  const {
    course,
    setCourse,
    modules,
    setModules,
    loading,
    setLoading,
    fetchCourseDetails,
  } = useContext(CourseContext);

  useEffect(() => {
    if (courseId && BackendUrl) {
      // Pass both courseId and BackendUrl as parameters
      fetchCourseDetails(courseId, BackendUrl);
    }
  }, [courseId, BackendUrl]); // Added BackendUrl as dependency

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

  // Course not found state
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

  // Rest of your component remains the same...
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-xl mb-2">
                Ready to start learning?
              </h3>
              <p className="text-blue-100 mb-4">
                Join thousands of students already enrolled in this course.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Enroll Now - {formatPrice(course.price)}
              </button>
            </div>
          </div>
        </div>

        <Modules />
      </div>
    </div>
  );
};

export default CourseDetails;