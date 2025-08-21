import React from 'react';

const RelatedCourses = () => {
  // Dummy related courses data
  const relatedCourses = [
    {
      course_id: "2",
      course_title: "Advanced JavaScript & ES6+",
      course_description: "Master modern JavaScript features, async programming, and advanced concepts for professional development.",
      course_image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?fit=crop&w=400&q=80",
      category: "JavaScript",
      price: "79.99",
      rating: 4.7,
      students_count: 2847,
      duration: "8.5 hours",
      level: "Advanced",
      instructor_name: "Sarah Johnson",
      instructor_image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?fit=crop&w=150&q=80",
      last_updated: "2024-06-15",
      is_bestseller: true
    },
    {
      course_id: "3", 
      course_title: "React & Redux Complete Course",
      course_description: "Build modern web applications with React, Redux, and state management best practices.",
      course_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?fit=crop&w=400&q=80",
      category: "React",
      price: "89.99",
      rating: 4.8,
      students_count: 3521,
      duration: "12 hours",
      level: "Intermediate",
      instructor_name: "Mike Chen",
      instructor_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&q=80",
      last_updated: "2024-07-08",
      is_bestseller: false
    },
    {
      course_id: "4",
      course_title: "Node.js & Express Backend Development",
      course_description: "Create scalable server-side applications with Node.js, Express, and MongoDB integration.",
      course_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fit=crop&w=400&q=80",
      category: "Backend",
      price: "94.99",
      rating: 4.6,
      students_count: 1876,
      duration: "10 hours",
      level: "Intermediate",
      instructor_name: "David Rodriguez",
      instructor_image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=150&q=80",
      last_updated: "2024-05-22",
      is_bestseller: false
    },
    {
      course_id: "5",
      course_title: "Full-Stack MERN Development",
      course_description: "Complete guide to building full-stack applications using MongoDB, Express, React, and Node.js.",
      course_image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?fit=crop&w=400&q=80",
      category: "Full-Stack",
      price: "129.99",
      rating: 4.9,
      students_count: 4203,
      duration: "16 hours",
      level: "Advanced",
      instructor_name: "Emma Thompson",
      instructor_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&q=80",
      last_updated: "2024-07-30",
      is_bestseller: true
    },
    {
      course_id: "6",
      course_title: "CSS Grid & Flexbox Mastery",
      course_description: "Master modern CSS layout techniques with Grid and Flexbox for responsive web design.",
      course_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&q=80",
      category: "CSS",
      price: "49.99",
      rating: 4.5,
      students_count: 1432,
      duration: "6 hours",
      level: "Beginner",
      instructor_name: "Alex Kim",
      instructor_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80",
      last_updated: "2024-04-18",
      is_bestseller: false
    },
    {
      course_id: "7",
      course_title: "TypeScript for JavaScript Developers",
      course_description: "Learn TypeScript fundamentals and advanced features to write better, more maintainable code.",
      course_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=400&q=80",
      category: "TypeScript", 
      price: "69.99",
      rating: 4.4,
      students_count: 987,
      duration: "7 hours",
      level: "Intermediate",
      instructor_name: "Ryan Park",
      instructor_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&q=80",
      last_updated: "2024-06-03",
      is_bestseller: false
    }
  ];

  // Function to format price
  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toFixed(2)}` : "Free";
  };

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  // Function to get level color
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2 mr-3">
              🎯
            </span>
            Related Courses
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
            View All
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCourses.map((course) => (
            <div
              key={course.course_id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.course_image}
                  alt={course.course_title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Bestseller Badge */}
                {course.is_bestseller && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      BESTSELLER
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>

                {/* Quick Preview Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100">
                      Quick Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                {/* Course Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.course_title}
                </h3>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {course.course_description}
                </p>

                {/* Instructor */}
                <div className="flex items-center mb-3">
                  <img
                    src={course.instructor_image}
                    alt={course.instructor_name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    {course.instructor_name}
                  </span>
                </div>

                {/* Rating & Students */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {course.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({course.students_count.toLocaleString()})
                    </span>
                  </div>
                  
                  {/* Level Badge */}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    🕒 {course.duration}
                  </span>
                  <span className="flex items-center">
                    📅 Updated {new Date(course.last_updated).toLocaleDateString()}
                  </span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                    {course.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${(parseFloat(course.price) * 1.4).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-[#0173d1] to-[#85c1f3] hover:from-[#85c1f3] hover:to-[#0173d1] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105">
            Explore More Courses
          </button>
        </div>
      </div>

      {/* Additional Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            📚 Complete Your Learning Path
          </h3>
          <p className="text-gray-600">
            Take your skills to the next level with these curated learning paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Path 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Frontend Specialist Path</h4>
                <p className="text-sm text-gray-600">5 courses • 45 hours</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Master frontend development with HTML, CSS, JavaScript, React, and advanced frameworks.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">$299.99</span>
              <span className="text-sm text-gray-500 line-through">$599.99</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Start Path
              </button>
            </div>
          </div>

          {/* Learning Path 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Full-Stack Developer Path</h4>
                <p className="text-sm text-gray-600">8 courses • 80 hours</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Complete full-stack journey from frontend to backend, databases, and deployment.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">$449.99</span>
              <span className="text-sm text-gray-500 line-through">$899.99</span>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
                Start Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedCourses;