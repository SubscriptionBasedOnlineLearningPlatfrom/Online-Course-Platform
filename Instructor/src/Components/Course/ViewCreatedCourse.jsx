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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Courses</h3>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 text-sm uppercase">
              <th className="py-3 px-4">Course Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">Updated Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr
                key={course.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800 text-left">
                  {course.name}
                </td>
                <td className="py-3 px-4 text-gray-600 text-left">{course.description}</td>
                <td className="py-3 px-4 font-semibold text-left">{course.price}</td>
                <td className="py-3 px-4 text-gray-500 text-left">{course.created}</td>
                <td className="py-3 px-4 text-gray-500 text-left">{course.updated}</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCourses.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-500"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCreatedCourse;
