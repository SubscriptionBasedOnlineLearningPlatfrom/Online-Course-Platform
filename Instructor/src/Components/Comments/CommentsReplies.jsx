import React, { useState } from "react";

const CommentsReplies = () => {
  // Sample comments data
  const [comments] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      course: "React for Beginners",
      comment: "Really helpful course! Loved the explanations.",
      date: "2025-07-15",
      status: "Approved",
    },
    {
      id: 2,
      student: "Mark Lee",
      course: "Node.js Mastery",
      comment: "Good content but could use more real-world examples.",
      date: "2025-07-12",
      status: "Pending",
    },
    {
      id: 3,
      student: "Sophia Davis",
      course: "AI with Python",
      comment: "Found some sections difficult to follow.",
      date: "2025-07-10",
      status: "Rejected",
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter comments by search
  const filteredComments = comments.filter(
    (c) =>
      c.student.toLowerCase().includes(search.toLowerCase()) ||
      c.course.toLowerCase().includes(search.toLowerCase()) ||
      c.comment.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Comments Report</h3>
        <input
          type="text"
          placeholder="Search comments..."
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
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Comment</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((c, index) => (
              <tr
                key={c.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {c.student}
                </td>
                <td className="py-3 px-4 text-gray-600">{c.course}</td>
                <td className="py-3 px-4 text-gray-700 max-w-md truncate">
                  {c.comment}
                </td>
                <td className="py-3 px-4 text-gray-500">{c.date}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    c.status === "Approved"
                      ? "text-green-600"
                      : c.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="py-3 px-4 text-center">
                  {c.status === "Pending" && (
                    <>
                      <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 transition">
                        Approve
                      </button>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 transition">
                        Reject
                      </button>
                    </>
                  )}
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredComments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 px-4 text-center text-gray-500"
                >
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsReplies;
