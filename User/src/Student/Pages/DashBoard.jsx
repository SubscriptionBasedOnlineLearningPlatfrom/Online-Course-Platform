
import React from "react";
import EnrolledCourses from "../Components/DashBoard/EnrolledCourses";

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full">
    <div
      className="h-2 rounded-full bg-blue-600"
      style={{ width: `${Math.min(value, 100)}%` }}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    />
  </div>
);

const KPI = ({ label, value, sub }) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </div>
);

const ListItem = ({ title, right, sub }) => (
  <div className="flex items-start justify-between py-3 border-b last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{title}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {right && <div className="text-xs text-gray-600">{right}</div>}
  </div>
);

const DashBoard = () => {
  // ---- Mock data (replace with API) ----
  const kpis = [
    { label: "Enrolled Courses", value: 6 },
    { label: "In Progress", value: 3, sub: "Keep it up!" },
    { label: "Certificates", value: 2 },
    { label: "Streak", value: "5 days", sub: "🔥 Daily goal met" },
  ];

  const continueLearning = [
    { id: 1, title: "React for Beginners", lesson: "Lesson 5: Props & State", progress: 62 },
    { id: 2, title: "Node.js Mastery", lesson: "Section 3: REST APIs", progress: 41 },
    { id: 3, title: "AI with Python", lesson: "Module 2: Numpy Basics", progress: 78 },
  ];

  const upcoming = [
    { id: 1, title: "Live Q&A – React", time: "Aug 30, 6:00 PM", sub: "Instructor: Sarah P." },
    { id: 2, title: "Workshop – APIs with Express", time: "Sep 02, 7:30 PM", sub: "Zoom link in course" },
  ];

  const deadlines = [
    { id: 1, title: "Quiz 2 – React Basics", due: "Due Aug 29, 11:59 PM", sub: "Minimum pass 70%" },
    { id: 2, title: "Assignment – Build Todo API", due: "Due Sep 03, 11:59 PM", sub: "Node.js Mastery" },
  ];

  const recommendations = [
    { id: 1, title: "TypeScript Essentials", sub: "Because you’re learning React" },
    { id: 2, title: "Git & GitHub Crash Course", sub: "Improve your project workflow" },
  ];

  const recent = [
    { id: 1, title: "Completed: React – Lesson 4", time: "2h ago" },
    { id: 2, title: "Scored 8/10 on Quiz 1", time: "1d ago" },
    { id: 3, title: "New comment on ‘AI with Python’", time: "2d ago" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Greeting / header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
          <p className="text-sm text-gray-600 mt-1">Here’s a quick look at your learning progress.</p>
        </div>
        <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Continue Learning
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <KPI key={k.label} {...k} />
        ))}
      </div>

      
      <div>
        <EnrolledCourses />
      </div>

      
    </div>
  );
}

export default DashBoard;