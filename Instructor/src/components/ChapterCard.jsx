import React, { useState, useEffect } from "react";

export default function ChapterCard({ chapter }) {
  const [resources, setResources] = useState([]);

  // Handle file upload simulation
  const handleAddResource = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setResources((prev) => [
          ...prev,
          { id: Date.now(), type, name: file.name },
        ]);
      }
    };
    input.click();
  };

  // Remove resource
  const handleDeleteResource = (id) => {
    setResources((prev) => prev.filter((res) => res.id !== id));
  };

  return (
    <div className="border border-blue-200 p-3 rounded-lg bg-gray-50 space-y-2">
      <h3 className="font-medium">{chapter.title}</h3>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleAddResource("Video")}
          className="px-3 py-1 bg-purple-600 text-white rounded"
        >
          Add Video
        </button>
        <button
          onClick={() => handleAddResource("Notes")}
          className="px-3 py-1 bg-yellow-600 text-white rounded"
        >
          Add Notes
        </button>
        <button
          onClick={() => handleAddResource("Assignment")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Assignment
        </button>
        <button
          onClick={() => handleAddResource("Quiz")}
          className="px-3 py-1 bg-green-600 text-white rounded"
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
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
