import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const EnrolledCourses = () => {
  // Tabs: enrolled or completed
  const [activeTab, setActiveTab] = useState("enrolled");

  // ---------------- Enrolled Courses Data ----------------
  const enrolledCoursesData = [
    {
      id: 1,
      title: "Advanced JavaScript Programming",
      instructor: "Sarah Johnson",
      category: "Development",
      progress: 65,
      remainingTime: 8.5,
      totalDuration: 20,
      lastAccessed: "2025-01-10",
      description: "Master advanced JavaScript concepts and patterns",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      category: "Design",
      progress: 40,
      remainingTime: 6.25,
      totalDuration: 15,
      lastAccessed: "2025-01-09",
      description:
        "Learn the principles of user interface and experience design",
    },
    // ... other enrolled courses
  ];

  // ---------------- Completed Courses Data ----------------
  const completedCoursesData = [
    {
      id: 101,
      title: "React.js Complete Guide",
      instructor: "John Smith",
      category: "Development",
      completedDate: "2025-01-15",
      score: 95,
      duration: 24,
      hasCertificate: true,
      skills: ["React", "JSX", "Hooks", "Redux", "Context API"],
      description:
        "Complete guide to building modern web applications with React",
    },
    {
      id: 102,
      title: "Figma for Beginners",
      instructor: "Lisa Wong",
      category: "Design",
      completedDate: "2025-01-08",
      score: 88,
      duration: 8,
      hasCertificate: true,
      skills: ["Figma", "Prototyping", "Design Systems", "UI Design"],
      description: "Learn the fundamentals of UI design using Figma",
    },
    // ... other completed courses
  ];

  // ---------------- Shared States ----------------
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all"); // For enrolled
  const [selectedCategory, setSelectedCategory] = useState("all"); // For completed

  // Load initial data when tab changes
  useEffect(() => {
    if (activeTab === "enrolled") {
      setCourses(enrolledCoursesData);
    } else {
      setCourses(completedCoursesData);
    }
  }, [activeTab]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [];

    if (activeTab === "enrolled") {
      filtered = courses.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          filterStatus === "all" ||
          (filterStatus === "in-progress" &&
            course.progress > 0 &&
            course.progress < 100) ||
          (filterStatus === "not-started" && course.progress === 0) ||
          (filterStatus === "almost-done" && course.progress >= 80);

        return matchesSearch && matchesFilter;
      });

      // Sorting for enrolled
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.lastAccessed) - new Date(a.lastAccessed);
          case "progress":
            return b.progress - a.progress;
          case "title":
            return a.title.localeCompare(b.title);
          case "duration":
            return a.remainingTime - b.remainingTime;
          default:
            return 0;
        }
      });
    } else {
      filtered = courses.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          course.category.toLowerCase() === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      // Sorting for completed
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.completedDate) - new Date(a.completedDate);
          case "score":
            return b.score - a.score;
          case "title":
            return a.title.localeCompare(b.title);
          case "duration":
            return b.duration - a.duration;
          default:
            return 0;
        }
      });
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, sortBy, filterStatus, selectedCategory, activeTab]);

  // Filter buttons for enrolled courses
  const filterOptions = [
    { key: "all", label: "All Courses", count: enrolledCoursesData.length },
    {
      key: "in-progress",
      label: "In Progress",
      count: enrolledCoursesData.filter(
        (c) => c.progress > 0 && c.progress < 100
      ).length,
    },
    {
      key: "not-started",
      label: "Not Started",
      count: enrolledCoursesData.filter((c) => c.progress === 0).length,
    },
    {
      key: "almost-done",
      label: "Almost Done",
      count: enrolledCoursesData.filter((c) => c.progress >= 80).length,
    },
  ];

  const getUniqueCategories = () => {
    return [...new Set(completedCoursesData.map((c) => c.category))];
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "enrolled"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Courses
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {activeTab === "enrolled" ? (
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterStatus === filter.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All Categories
              </button>
              {getUniqueCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Search and Sort */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="px-3 py-2 border rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {activeTab === "enrolled" ? (
                <>
                  <option value="recent">Recently Accessed</option>
                  <option value="progress">Progress</option>
                  <option value="title">Title A-Z</option>
                  <option value="duration">Remaining Time</option>
                </>
              ) : (
                <>
                  <option value="recent">Recently Completed</option>
                  <option value="score">Highest Score</option>
                  <option value="title">Title A-Z</option>
                  <option value="duration">Duration</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              type={activeTab}
              onContinue={(id) => console.log(`Continue ${id}`)}
              onDownloadCertificate={(id) =>
                console.log(`Download certificate for ${id}`)
              }
              onReviewCourse={(id) => console.log(`Review course ${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border p-12 text-center">
          <h3 className="text-lg font-medium">
            No {activeTab} courses found
          </h3>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
