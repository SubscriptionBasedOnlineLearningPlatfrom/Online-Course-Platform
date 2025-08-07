import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // assumed there is link for each course routed to course/id
import course1 from '../assets/course1.jpg';
import course2 from '../assets/course2.jpg';
import course3 from '../assets/course3.jpg';
import course4 from '../assets/course4.jpg';
// temporarily added images

const courses = [
  { id: 1, name: 'Web Development', description: 'Learn HTML, CSS, JavaScript and more.', image: course1 },
  { id: 2, name: 'Data Science', description: 'Master data analysis and machine learning.', image: course2 },
  { id: 3, name: 'AI Fundamentals', description: 'Dive into AI and neural networks.', image: course3 },
  { id: 4, name: 'OOP Concepts', description: 'Dive into OOP Concepts.', image: course4 },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-semibold">Explore Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Link
              to={`/course/${course.id}`}
              key={course.id}
              className="block bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition duration-300"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default Courses;


/* 
 ===== CODE before modification =====

import React, { useState } from 'react';
import course1 from '../assets/course1.jpg';
import course2 from '../assets/course2.jpg';
import course3 from '../assets/course3.jpg';
import course4 from '../assets/course4.jpg';
// temporarily added images

const courses = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript and more.',
    image: course1,
  },
  {
    id: 2,
    name: 'Data Science',
    description: 'Master data analysis and machine learning.',
    image: course2,
  },
  {
    id: 3,
    name: 'AI Fundamentals',
    description: 'Dive into AI and neural networks.',
    image: course3,
  },
  {
    id: 4,
    name: 'OOP Concepts',
    description: 'Dive into OOP Concepts.',
    image: course4,
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered courses based on search query
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-semibold">Explore Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No courses found.</p>
      )}
    </div>
  );
};

export default Courses;
 */