import React, { useState, useEffect } from "react";

const CommentsReplies = () => {
  const [comments] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      course: "React for Beginners",
      comment: "Really helpful course! Loved the explanations.",
      date: "2025-07-15",
    },
    {
      id: 2,
      student: "Mark Lee",
      course: "Node.js Mastery",
      comment: "Good content but could use more real-world examples.",
      date: "2025-07-12",
    },
    {
      id: 3,
      student: "Sophia Davis",
      course: "AI with Python",
      comment: "Found some sections difficult to follow.",
      date: "2025-07-10",
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [replies, setReplies] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [tempReply, setTempReply] = useState("");

  // Load replies from localStorage on mount
  useEffect(() => {
    const storedReplies = JSON.parse(localStorage.getItem("replies")) || {};
    setReplies(storedReplies);
  }, []);

  // Save replies to localStorage whenever replies change
  useEffect(() => {
    localStorage.setItem("replies", JSON.stringify(replies));
  }, [replies]);

  const handleReplySubmit = (id) => {
    if (!replies[id] || !replies[id].trim()) return;
    setActiveReply(null);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setTempReply(replies[id]);
  };

  const handleSaveEdit = (id) => {
    if (!tempReply.trim()) return;
    setReplies({ ...replies, [id]: tempReply });
    setEditingId(null);
    setTempReply("");
  };

  const handleDelete = (id) => {
    const updatedReplies = { ...replies };
    delete updatedReplies[id];
    setReplies(updatedReplies);
    localStorage.setItem("replies", JSON.stringify(updatedReplies));

    if (editingId === id) setEditingId(null);
    if (activeReply === id) setActiveReply(null);
  };

  const filteredComments = comments.filter(
    (c) =>
      c.student.toLowerCase().includes(search.toLowerCase()) ||
      c.course.toLowerCase().includes(search.toLowerCase()) ||
      c.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Comments & Replies</h3>
        <input
          type="text"
          placeholder="Search comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 text-sm uppercase">
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Comment</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Reply</th>
              <th className="py-3 px-4 text-center">Action</th>
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

                {/* Reply Column */}
                <td className="py-3 px-4 text-gray-700">
                  {editingId === c.id
                    ? tempReply
                    : replies[c.id] || (
                        <span className="text-gray-400 italic">No reply</span>
                      )}
                </td>

                {/* Action Column */}
                <td className="py-3 px-4 text-center">
                  {/* Show textarea if activeReply */}
                  {activeReply === c.id && editingId !== c.id && (
                    <div>
                      <textarea
                        rows="2"
                        placeholder="Type your reply..."
                        className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                        value={replies[c.id] || ""}
                        onChange={(e) =>
                          setReplies({ ...replies, [c.id]: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {/* Buttons */}
                  {editingId === c.id ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleSaveEdit(c.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md text-xs hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded-md text-xs hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : replies[c.id] ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(c.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      {activeReply === c.id && (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition mr-2"
                          onClick={() => setActiveReply(null)}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                        onClick={() =>
                          setActiveReply(activeReply === c.id ? null : c.id)
                        }
                      >
                        {activeReply === c.id ? "Submit" : "Reply"}
                      </button>
                    </div>
                  )}

                  {/* Submit button for new reply */}
                  {activeReply === c.id && replies[c.id] && (
                    <button
                      onClick={() => handleReplySubmit(c.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md ml-1 text-xs hover:bg-green-600"
                    >
                      Submit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredComments.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
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
