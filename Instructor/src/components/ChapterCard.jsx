import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChapterCard({ chapter }) {
  // Initialize state with existing files
  const [resources, setResources] = useState(chapter.files || []);
  const navigate = useNavigate();

  // Handle file upload
  const handleAddResource = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newResource = {
          id: Date.now(), // or backend id
          type,
          name: file.name,
        };
        setResources((prev) => [...prev, newResource]);
      }
    };
    input.click();
  };

  // Remove resource
  const handleDeleteResource = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setResources((prev) => prev.filter((res) => res.id !== id));
      //   call DELETE /api/resources/:id
    }
  };

  return (
    <div className="border border-blue-200 p-3 rounded-lg bg-gray-50 space-y-2">
      <h3 className="font-medium">{chapter.title}</h3>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleAddResource("Video")}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Add Video
        </button>
        <button
          onClick={() => handleAddResource("Notes")}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Add Notes
        </button>
        <button
          onClick={() => handleAddResource("Assignment")}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Add Assignment
        </button>
        <button
          onClick={() => navigate('/QuizCreation')}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Add Quiz
        </button>
      </div>

      {/* List of resources */}
      <div className="mt-2 space-y-1">
        {resources.map((res) => (
          <div
            key={res.id}
            className="flex items-center justify-between border-b pb-1"
          >
            <span>
              {res.type}: <span className="text-gray-700">{res.name}</span>
            </span>
            <button
              onClick={() => handleDeleteResource(res.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
