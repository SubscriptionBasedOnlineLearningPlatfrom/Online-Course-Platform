

  import React, { useContext, useEffect } from 'react'
import CourseContext from '../Contexts/CourseContext';
import { useParams } from 'react-router-dom';
import APIContext from '../Contexts/APIContext';
  
  const Modules = () => {

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

//   useEffect(() => {
//     if (courseId && BackendUrl) {
//       // Pass both courseId and BackendUrl as parameters
//       fetchCourseDetails(courseId, BackendUrl);
//     }
//   }, [courseId, BackendUrl]); // Added BackendUrl as dependency

    return (
      <div>
        {/* Course Content */}
        <div className="mt-12">
          {/* Modules Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-600 text-white rounded-lg p-2 mr-3">
                📚
              </span>
              Course Curriculum
            </h2>

            {modules.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">
                  No modules available yet
                </p>
                <p className="text-gray-400 text-sm">
                  Course content is being prepared
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module) => (
                  <div
                    key={module.module_id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                        {module.module_order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {module.module_title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Module {module.module_order} of {modules.length}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  export default Modules