import React, { useState } from "react";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const ViewCreatedCourse = () => {
  // ----- data (now mutable) -----
  const [courses, setCourses] = useState([
    { id: 1, name: "React for Beginners", description: "Learn the basics of React.js", price: "$49", created: "2025-07-01", updated: "2025-07-10" },
    { id: 2, name: "Node.js Mastery", description: "Backend development with Node.js", price: "$79", created: "2025-06-20", updated: "2025-07-05" },
    { id: 3, name: "AI with Python", description: "Introduction to AI concepts", price: "$99", created: "2025-05-15", updated: "2025-06-10" },
  ]);

  const [search, setSearch] = useState("");

  // ----- edit modal state -----
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  // filter by search
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
  );

  // --------- handlers ----------
  const handleDelete = (id) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setForm({ name: course.name, description: course.description, price: course.price });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", description: "", price: "" });
  };

  const saveEdit = () => {
    const { name, description, price } = form;
    if (!name.trim() || !description.trim() || !price.trim()) return;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    setCourses((prev) =>
      prev.map((c) =>
        c.id === editingId ? { ...c, name, description, price, updated: today } : c
      )
    );
    cancelEdit();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] bg-clip-text text-transparent mb-2">
              Courses
            </h1>
            <p className="text-gray-600">Manage and view all your created courses</p>
          </div>

          {/* Search */}
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

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">📚 Course Name</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">📝 Description</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">💰 Price</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">📅 Created Date</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">🔄 Updated Date</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">⚡ Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-blue-50/50 transition-all duration-200 group">
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#0173d1] to-[#85c1f3] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {course.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-600 max-w-xs">{course.description}</div>
                  </td>

                  <td className="py-5 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      {course.price}
                    </span>
                  </td>

                  <td className="py-5 px-6"><div className="text-sm text-gray-600">{course.created}</div></td>
                  <td className="py-5 px-6"><div className="text-sm text-gray-600">{course.updated}</div></td>

                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center space-x-3">
                      {/* EDIT */}
                      <button
                        onClick={() => startEdit(course)}
                        className="inline-flex items-center px-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200"
                        title="Edit"
                      >
                        <FaEdit />
                        
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="inline-flex items-center px-2 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-200"
                        title="Delete"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {/* ---------- Edit Modal ---------- */}
      {editingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Course</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Course Name</label>
                <input
                  className="mt-1 w-full border rounded-lg p-2"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 w-full border rounded-lg p-2"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Price</label>
                <input
                  className="mt-1 w-full border rounded-lg p-2"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="$49"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={cancelEdit} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCreatedCourse;
