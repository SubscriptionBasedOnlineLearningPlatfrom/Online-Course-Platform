import React, { useState } from "react";

const EnrollmentOverview = () => {
  // Sample student overview data
  const [students] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      totalEnrollments: 3,
      watchTime: "12h 30m",
      completionRate: "85%",
      certificates: 2,
    },
    {
      id: 2,
      name: "Mark Lee",
      totalEnrollments: 5,
      watchTime: "25h 10m",
      completionRate: "92%",
      certificates: 4,
    },
    {
      id: 3,
      name: "Sophia Davis",
      totalEnrollments: 2,
      watchTime: "8h 15m",
      completionRate: "60%",
      certificates: 1,
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter students by search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Enrollments Overview
        </h3>
        <input
          type="text"
          placeholder="Search students..."
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
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Total Enrollments</th>
              <th className="py-3 px-4">Total Watch Time</th>
              <th className="py-3 px-4">Completion Rate</th>
              <th className="py-3 px-4">Certificates Issued</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800 text-left">
                  {student.name}
                </td>
                <td className="py-3 px-4 text-gray-600 text-left">
                  {student.totalEnrollments}
                </td>
                <td className="py-3 px-4 text-gray-600 text-left">
                  {student.watchTime}
                </td>
                <td
                  className={`py-3 px-4 font-semibold text-left ${
                    parseInt(student.completionRate) >= 80
                      ? "text-green-600"
                      : parseInt(student.completionRate) >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {student.completionRate}
                </td>
                <td className="py-3 px-4 text-gray-600 text-left">
                  {student.certificates}
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition">
                    View
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentOverview;
