import React, { useState } from "react";

const ViewCreatedCourse = () => {
  // Sample data
  const [courses] = useState([
    {
      id: 1,
      name: "React for Beginners",
      description: "Learn the basics of React.js",
      price: "$49",
      created: "2025-07-01",
      updated: "2025-07-10",
    },
    {
      id: 2,
      name: "Node.js Mastery",
      description: "Backend development with Node.js",
      price: "$79",
      created: "2025-06-20",
      updated: "2025-07-05",
    },
    {
      id: 3,
      name: "AI with Python",
      description: "Introduction to AI concepts",
      price: "$99",
      created: "2025-05-15",
      updated: "2025-06-10",
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter courses by search
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] bg-clip-text text-transparent mb-2">
              Courses
            </h1>
            <p className="text-gray-600">Manage and view all your created courses</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Course Name</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>📝</span>
                    <span>Description</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>💰</span>
                    <span>Price</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>Created Date</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>🔄</span>
                    <span>Updated Date</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center justify-center space-x-2">
                    <span>⚡</span>
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className="hover:bg-blue-50/50 transition-all duration-200 group"
                >
                  {/* Course Name */}
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {course.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Description */}
                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {course.description}
                    </div>
                  </td>
                  
                  {/* Price */}
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      {course.price}
                    </span>
                  </td>
                  
                  {/* Created Date */}
                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                     
                      <span>{course.created}</span>
                    </div>
                  </td>
                  
                  {/* Updated Date */}
                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      
                      <span>{course.updated}</span>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center space-x-3">
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        
                      </button>
                      
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-200 transform hover:-translate-y-0.5">
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Stats */}
      {filteredCourses.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg py-2 px-4 inline-block border border-white/20">
            Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span> of{" "}
            <span className="font-semibold text-blue-600">{courses.length}</span> courses
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewCreatedCourse;