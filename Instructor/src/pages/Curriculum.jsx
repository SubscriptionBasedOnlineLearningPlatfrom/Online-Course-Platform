import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChapterCard from "../components/ChapterCard";
import { Trash2 } from "lucide-react";

/* http://localhost:5173/courses/c1/curriculum */

const CurriculumPage = () => {
  const { courseId } = useParams();

  const courseCurriculums = { //backend should send data in this format
    "c1": [
      {
        moduleId: "m1",
        title: "Introduction to Programming",
        chapters: [
          {
            chapterId: "ch1",
            title: "What is Programming?",
            files: [
              { id: "f1", type: "video", name: "intro.mp4" },
              { id: "f2", type: "pdf", name: "notes.pdf" },
            ],
          },
          {
            chapterId: "ch2",
            title: "Installing Tools",
            files: [{ id: "f3", type: "video", name: "setup.mp4" }],
          },
        ],
      },
    ],
    "c2": [
      {
        moduleId: "m2",
        title: "JavaScript Basics",
        chapters: [
          { chapterId: "ch3", title: "Variables and Data Types", files: [] },
          { chapterId: "ch4", title: "Functions", files: [] },
        ],
      },
      {
        moduleId: "m3",
        title: "DOM Manipulation",
        chapters: [{ chapterId: "ch5", title: "Selectors", files: [] }],
      },
    ],
    "c3": [],
  };

  const [modules, setModules] = useState([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newChapterTitle, setNewChapterTitle] = useState({});
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    if (courseId && courseCurriculums[courseId]) {
      setModules(courseCurriculums[courseId]);
    } else {
      setModules([]);
    }
  }, [courseId]);

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newModule = {
      moduleId: `m${Date.now()}`,
      title: newModuleTitle,
      chapters: [],
    };
    setModules([...modules, newModule]);
    setNewModuleTitle("");
  };

  const handleDeleteModule = (moduleId) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      setModules(modules.filter((mod) => mod.moduleId !== moduleId));
    }
  };

  const handleAddChapter = (moduleId) => {
    const title = newChapterTitle[moduleId];
    if (!title?.trim()) return;
    setModules((prev) =>
      prev.map((mod) =>
        mod.moduleId === moduleId
          ? {
              ...mod,
              chapters: [
                ...mod.chapters,
                { chapterId: `ch${Date.now()}`, title, files: [] },
              ],
            }
          : mod
      )
    );
    setNewChapterTitle((prev) => ({ ...prev, [moduleId]: "" }));
  };

  const handleDeleteChapter = (moduleId, chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      setModules((prev) =>
        prev.map((mod) =>
          mod.moduleId === moduleId
            ? {
                ...mod,
                chapters: mod.chapters.filter((ch) => ch.chapterId !== chapterId),
              }
            : mod
        )
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 bg-blue-50 rounded-xl shadow-sm">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 text-center sm:text-left">
        Course Curriculum (Course ID: {courseId})
      </h1>

      {modules.length === 0 ? (
        <p className="text-gray-500 italic text-center sm:text-left">
          No modules yet. Add a module below.
        </p>
      ) : (
        modules.map((mod) => (
          <div
            key={mod.moduleId}
            className="border border-blue-200 rounded-xl bg-white shadow-sm"
          >
            {/* Module Header */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setOpenModule(openModule === mod.moduleId ? null : mod.moduleId)
                }
                className="w-full flex justify-between items-center p-3 sm:p-4 text-left font-semibold text-base sm:text-lg text-blue-800 hover:bg-blue-100 rounded-t-xl"
              >
                {mod.title}
                <span className="text-sm">
                  {openModule === mod.moduleId ? "▲" : "▼"}
                </span>
              </button>
              <button
                onClick={() => handleDeleteModule(mod.moduleId)}
                className="p-2 text-red-500 hover:text-red-700"
                title="Delete Module"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Module Body */}
            {openModule === mod.moduleId && (
              <div className="p-3 sm:p-4 space-y-3 border-t border-blue-100">
                {mod.chapters.length === 0 && (
                  <p className="text-gray-500">No chapters yet. Add chapters below.</p>
                )}

                {mod.chapters.map((ch) => (
                  <div
                    key={ch.chapterId}
                    className="flex items-center gap-2 border border-blue-100 rounded-lg p-2 bg-gray-50"
                  >
                    <ChapterCard chapter={ch} />
                    <button
                      onClick={() => handleDeleteChapter(mod.moduleId, ch.chapterId)}
                      className="p-2 text-red-500 hover:text-red-700"
                      title="Delete Chapter"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Add Chapter */}
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mt-2">
                  <input
                    type="text"
                    placeholder="New chapter name"
                    value={newChapterTitle[mod.moduleId] || ""}
                    onChange={(e) =>
                      setNewChapterTitle((prev) => ({
                        ...prev,
                        [mod.moduleId]: e.target.value,
                      }))
                    }
                    className="border border-blue-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  />
                  <button
                    onClick={() => handleAddChapter(mod.moduleId)}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                  >
                    Add Chapter
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Add Module */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mt-4">
        <input
          type="text"
          placeholder="New module name"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="border border-blue-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />
        <button
          onClick={handleAddModule}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
        >
          Add Module
        </button>
      </div>
    </div>
  );
};

export default CurriculumPage;
