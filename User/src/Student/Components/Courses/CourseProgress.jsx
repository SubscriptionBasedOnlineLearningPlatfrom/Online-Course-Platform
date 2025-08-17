

/* message to dev team - this component will be called in Course Detail page.there should be a view progress button in course detail page
   The link for that button should be this <Link to={`/courses/${course.id}/progress`}>View My Progress</Link>

Also for this there should be a student progress table with s_id,c_id,moduel_id,completed(T/F),completed date
Token payload should include student id
Get the total number of modules from Module table of the course, because can not take it from student progress table
*/

import React from "react";
import { useParams } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const CourseProgress = () => {
  const { courseId } = useParams();
  const studentId = "stu001"; // dummy for now

  // Dummy data
  const courseProgress = {
    courseId,
    studentId,
    modules: [
      { id: "mod1", name: "Module 1: Intro", completed: true, dateCompleted: "2025-08-01" },
      { id: "mod2", name: "Module 2: Basics", completed: true, dateCompleted: "2025-08-05" },
      { id: "mod3", name: "Module 3: Advanced", completed: false, dateCompleted: null },
    ],
  };

  const completedModules = courseProgress.modules.filter(m => m.completed).length;
  const totalModules = courseProgress.modules.length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);
  const pieData = [
    { name: "Completed", value: completedModules },
    { name: "Not Completed", value: totalModules - completedModules },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  const lineData = courseProgress.modules
    .filter(m => m.completed)
    .map((m, index) => ({
      date: m.dateCompleted,
      completedCount: index + 1,
    }));

  return (
    <div className="p-6 min-h-[calc(100vh-100px)]">
      {/* Info Cards */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex-1 min-w-[250px] bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Course ID</h3>
          <p className="text-gray-700">{courseId}</p>
        </div>
        <div className="flex-1 min-w-[250px] bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Student ID</h3>
          <p className="text-gray-700">{studentId}</p>
        </div>
        <div className="flex-1 min-w-[250px] bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Modules Completed</h3>
          <p className="text-gray-700">{completedModules} / {totalModules} ({progressPercent}%)</p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Pie Chart Card */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 h-[400px] flex justify-center items-center">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              cornerRadius={10} // curved edges
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        {/* Line Chart Card */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 ">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="completedCount"
                stroke="#82ca9d"
                fill="url(#progressGradient)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#82ca9d" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;



/* import React from "react";
import { useParams } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const CourseProgress = () => {
  const { courseId } = useParams();
  const studentId = "stu001"; // dummy for now

  // Dummy data
  const courseProgress = {
    courseId,
    studentId,
    modules: [
      { id: "mod1", name: "Module 1: Intro", completed: true, dateCompleted: "2025-08-01" },
      { id: "mod2", name: "Module 2: Basics", completed: true, dateCompleted: "2025-08-05" },
      { id: "mod3", name: "Module 3: Advanced", completed: false, dateCompleted: null },
    ],
  };

  // for pie chart
  const completedModules = courseProgress.modules.filter(m => m.completed).length;
  const totalModules = courseProgress.modules.length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);

  // Pie chart data
  const pieData = [
    { name: "Completed", value: completedModules },
    { name: "Not Completed", value: totalModules - completedModules },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  // Line chart data
  const lineData = courseProgress.modules
    .filter(m => m.completed)
    .map((m, index) => ({
      date: m.dateCompleted,
      completedCount: index + 1, 
    }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Progress for Course: {courseId}</h2>
      <p>Student ID: {studentId}</p>
      <p>
        Completed: {completedModules}/{totalModules} modules ({progressPercent}%)
      </p>

      
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>

     
      <div style={{ marginTop: "50px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip /> 
            <Area
              type="monotone"
              dataKey="completedCount"
              stroke="#82ca9d"
              fill="url(#progressGradient)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#82ca9d" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CourseProgress;
 */