import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CourseModules = () => {
  //     const { courseId } = useParams();
  //   const { BackendUrl } = useContext(APIContext); // Fixed: Added destructuring
  //   const {
  //     course,
  //     setCourse,
  //     modules,
  //     setModules,
  //     loading,
  //     setLoading,
  //     fetchCourseDetails,
  //   } = useContext(CourseContext);

  //   useEffect(() => {
  //     if (courseId && BackendUrl) {
  //       // Pass both courseId and BackendUrl as parameters
  //       fetchCourseDetails(courseId, BackendUrl);
  //     }
  //   }, [courseId, BackendUrl]); // Added BackendUrl as dependency

  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState(null);

  // Dummy modules data
    const dummyModules = [
  {
    module_id: "1",
    module_title: "HTML & CSS Fundamentals",
    module_description: "Learn the basics of HTML and CSS",
    order: 1,
    duration: "2 hours",
    content: {
      lessons: [
        {
          lesson_id: "1.1",
          title: "Introduction to HTML",
          type: "video",
          duration: "30 minutes",
          video_url: "https://example.com/videos/html-intro.mp4"
        },
        {
          lesson_id: "1.2",
          title: "HTML Elements and Tags",
          type: "reading",
          pdf_url: "https://example.com/pdfs/html-elements-guide.pdf",
          duration: "20 minutes"
        },
        {
          lesson_id: "1.3",
          title: "CSS Styling Basics",
          type: "video",
          duration: "40 minutes",
          video_url: "https://example.com/videos/css-basics.mp4"
        }
      ],
      resources: {
        pdfs: [
          {
            title: "HTML5 Reference Sheet",
            url: "https://example.com/pdfs/html5-reference.pdf",
            description: "Complete HTML5 elements and attributes reference"
          },
          {
            title: "CSS Properties Cheat Sheet",
            url: "https://example.com/pdfs/css-cheatsheet.pdf",
            description: "Common CSS properties and values"
          }
        ],
        images: [
          {
            title: "HTML Document Structure",
            url: "https://example.com/images/html-structure.png",
            description: "Visual representation of HTML document anatomy"
          },
          {
            title: "CSS Box Model Diagram",
            url: "https://example.com/images/css-box-model.jpg",
            description: "Illustration of margin, border, padding, and content"
          }
        ]
      },
      quiz: {
        quiz_id: "quiz_1",
        title: "HTML & CSS Fundamentals Quiz",
        questions: [
          {
            id: 1,
            question: "What does HTML stand for?",
            type: "multiple_choice",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "Hyperlink and Text Markup Language"
            ],
            correct_answer: 0
          },
          {
            id: 2,
            question: "Which CSS property is used to change the text color?",
            type: "multiple_choice",
            options: ["font-color", "text-color", "color", "text-style"],
            correct_answer: 2
          },
          {
            id: 3,
            question: "What is the correct HTML element for the largest heading?",
            type: "fill_blank",
            question_text: "The correct element is: ___",
            correct_answer: "h1"
          }
        ],
        passing_score: 70,
        time_limit: "15 minutes"
      },
      assignment: {
        assignment_id: "assignment_1",
        title: "Build Your First Webpage",
        description: "Create a personal portfolio webpage using HTML and CSS",
        requirements: [
          "Use semantic HTML elements (header, nav, main, footer)",
          "Include at least 3 sections (about, skills, contact)",
          "Apply CSS styling with external stylesheet",
          "Use CSS Grid or Flexbox for layout",
          "Include at least one image and styled form"
        ],
        submission_format: "ZIP file containing HTML, CSS, and image files",
        due_date: "End of week 1",
        max_score: 100
      }
    }
  },
  {
    module_id: "2",
    module_title: "JavaScript Essentials",
    module_description: "Master JavaScript programming concepts",
    order: 2,
    duration: "4 hours",
    content: {
      lessons: [
        {
          lesson_id: "2.1",
          title: "JavaScript Syntax and Variables",
          type: "video",
          duration: "45 minutes",
          video_url: "https://example.com/videos/js-syntax.mp4"
        },
        {
          lesson_id: "2.2",
          title: "Functions and Scope",
          type: "interactive",
          duration: "60 minutes",
          interactive_url: "https://example.com/interactive/js-functions"
        },
        {
          lesson_id: "2.3",
          title: "DOM Manipulation",
          type: "video",
          duration: "50 minutes",
          video_url: "https://example.com/videos/dom-manipulation.mp4"
        }
      ],
      resources: {
        pdfs: [
          {
            title: "JavaScript ES6+ Features Guide",
            url: "https://example.com/pdfs/js-es6-guide.pdf",
            description: "Modern JavaScript features and syntax"
          },
          {
            title: "DOM Methods Reference",
            url: "https://example.com/pdfs/dom-reference.pdf",
            description: "Complete list of DOM manipulation methods"
          }
        ],
        images: [
          {
            title: "JavaScript Data Types",
            url: "https://example.com/images/js-data-types.png",
            description: "Visual guide to primitive and object data types"
          },
          {
            title: "Event Loop Visualization",
            url: "https://example.com/images/event-loop.jpg",
            description: "How JavaScript handles asynchronous operations"
          },
          {
            title: "Scope Chain Diagram",
            url: "https://example.com/images/scope-chain.png",
            description: "Understanding global, function, and block scope"
          }
        ]
      },
      quiz: {
        quiz_id: "quiz_2",
        title: "JavaScript Essentials Quiz",
        questions: [
          {
            id: 1,
            question: "What is the correct way to declare a variable in modern JavaScript?",
            type: "multiple_choice",
            options: ["var name;", "let name;", "const name;", "Both let and const"],
            correct_answer: 3
          },
          {
            id: 2,
            question: "Which method is used to add an element to the end of an array?",
            type: "multiple_choice",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correct_answer: 0
          },
          {
            id: 3,
            question: "Complete the function: function greet(name) { return 'Hello ' + ___; }",
            type: "fill_blank",
            question_text: "return 'Hello ' + ___;",
            correct_answer: "name"
          }
        ],
        passing_score: 75,
        time_limit: "20 minutes"
      },
      assignment: {
        assignment_id: "assignment_2",
        title: "Interactive To-Do List Application",
        description: "Build a fully functional to-do list using vanilla JavaScript",
        requirements: [
          "Add new tasks with input validation",
          "Mark tasks as complete/incomplete",
          "Delete tasks with confirmation",
          "Filter tasks (all, active, completed)",
          "Persist data using localStorage",
          "Responsive design with CSS"
        ],
        submission_format: "GitHub repository link",
        due_date: "End of week 2",
        max_score: 100
      }
    }
  },
  {
    module_id: "3",
    module_title: "React Development",
    module_description: "Build modern web applications with React",
    order: 3,
    duration: "6 hours",
    content: {
      lessons: [
        {
          lesson_id: "3.1",
          title: "React Components and JSX",
          type: "video",
          duration: "60 minutes",
          video_url: "https://example.com/videos/react-components.mp4"
        },
        {
          lesson_id: "3.2",
          title: "State Management with Hooks",
          type: "video",
          duration: "75 minutes",
          video_url: "https://example.com/videos/react-hooks.mp4"
        },
        {
          lesson_id: "3.3",
          title: "React Router and Navigation",
          type: "reading",
          pdf_url: "https://example.com/pdfs/react-router-guide.pdf",
          duration: "45 minutes"
        },
        {
          lesson_id: "3.4",
          title: "API Integration and useEffect",
          type: "video",
          duration: "90 minutes",
          video_url: "https://example.com/videos/react-api.mp4"
        }
      ],
      resources: {
        pdfs: [
          {
            title: "React Hooks Comprehensive Guide",
            url: "https://example.com/pdfs/react-hooks-guide.pdf",
            description: "Complete guide to all React hooks with examples"
          },
          {
            title: "React Best Practices",
            url: "https://example.com/pdfs/react-best-practices.pdf",
            description: "Industry standards and best practices for React development"
          },
          {
            title: "Component Design Patterns",
            url: "https://example.com/pdfs/react-patterns.pdf",
            description: "Advanced React patterns and architectural decisions"
          }
        ],
        images: [
          {
            title: "React Component Lifecycle",
            url: "https://example.com/images/react-lifecycle.png",
            description: "Visual representation of React component lifecycle methods"
          },
          {
            title: "Virtual DOM Concept",
            url: "https://example.com/images/virtual-dom.jpg",
            description: "How React's virtual DOM improves performance"
          },
          {
            title: "React Hooks Flow Chart",
            url: "https://example.com/images/hooks-flowchart.png",
            description: "Decision tree for choosing the right hook"
          },
          {
            title: "State vs Props Comparison",
            url: "https://example.com/images/state-vs-props.png",
            description: "Visual comparison of state and props in React"
          }
        ]
      },
      quiz: {
        quiz_id: "quiz_3",
        title: "React Development Quiz",
        questions: [
          {
            id: 1,
            question: "What is JSX?",
            type: "multiple_choice",
            options: [
              "A JavaScript extension",
              "JavaScript XML syntax extension",
              "A React library",
              "A CSS framework"
            ],
            correct_answer: 1
          },
          {
            id: 2,
            question: "Which hook is used for side effects in React?",
            type: "multiple_choice",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correct_answer: 1
          },
          {
            id: 3,
            question: "Complete the hook: const [count, setCount] = _____(0);",
            type: "fill_blank",
            question_text: "const [count, setCount] = _____(0);",
            correct_answer: "useState"
          },
          {
            id: 4,
            question: "What is the purpose of the key prop in React lists?",
            type: "short_answer",
            question_text: "Explain why the key prop is important when rendering lists in React.",
            sample_answer: "The key prop helps React identify which items have changed, been added, or removed, enabling efficient updates to the virtual DOM."
          }
        ],
        passing_score: 80,
        time_limit: "25 minutes"
      },
      assignment: {
        assignment_id: "assignment_3",
        title: "React Movie Database App",
        description: "Create a movie search and favorites application using React",
        requirements: [
          "Integrate with external movie API (OMDB or TMDB)",
          "Implement search functionality with debouncing",
          "Create reusable components (MovieCard, SearchBar, etc.)",
          "Add movies to favorites with localStorage persistence",
          "Implement routing with React Router (Home, Favorites, Details)",
          "Handle loading states and error handling",
          "Responsive design with modern UI framework (Material-UI or styled-components)"
        ],
        submission_format: "GitHub repository with live deployment link (Netlify/Vercel)",
        due_date: "End of week 3",
        max_score: 150
      }
    }
  },
  {
    module_id: "4",
    module_title: "Backend with Node.js",
    module_description: "Create server-side applications",
    order: 4,
    duration: "5 hours",
    content: {
      lessons: [
        {
          lesson_id: "4.1",
          title: "Node.js Fundamentals",
          type: "video",
          duration: "50 minutes",
          video_url: "https://example.com/videos/nodejs-intro.mp4"
        },
        {
          lesson_id: "4.2",
          title: "Express.js Framework",
          type: "video",
          duration: "70 minutes",
          video_url: "https://example.com/videos/express-framework.mp4"
        },
        {
          lesson_id: "4.3",
          title: "Database Integration with MongoDB",
          type: "reading",
          pdf_url: "https://example.com/pdfs/mongodb-integration.pdf",
          duration: "60 minutes"
        },
        {
          lesson_id: "4.4",
          title: "Authentication and Security",
          type: "video",
          duration: "80 minutes",
          video_url: "https://example.com/videos/node-security.mp4"
        }
      ],
      resources: {
        pdfs: [
          {
            title: "RESTful API Design Guide",
            url: "https://example.com/pdfs/rest-api-guide.pdf",
            description: "Best practices for designing RESTful APIs"
          },
          {
            title: "Node.js Security Checklist",
            url: "https://example.com/pdfs/nodejs-security.pdf",
            description: "Essential security practices for Node.js applications"
          },
          {
            title: "MongoDB Schema Design",
            url: "https://example.com/pdfs/mongodb-schema.pdf",
            description: "Guidelines for effective MongoDB schema design"
          },
          {
            title: "Express.js Middleware Guide",
            url: "https://example.com/pdfs/express-middleware.pdf",
            description: "Understanding and creating custom middleware"
          }
        ],
        images: [
          {
            title: "Node.js Event Loop",
            url: "https://example.com/images/nodejs-event-loop.png",
            description: "How Node.js handles asynchronous operations"
          },
          {
            title: "Express.js Request-Response Cycle",
            url: "https://example.com/images/express-cycle.jpg",
            description: "Visual flow of Express.js request handling"
          },
          {
            title: "REST API Architecture",
            url: "https://example.com/images/rest-architecture.png",
            description: "RESTful API structure and HTTP methods"
          },
          {
            title: "JWT Authentication Flow",
            url: "https://example.com/images/jwt-flow.png",
            description: "JSON Web Token authentication process"
          },
          {
            title: "MongoDB Document Structure",
            url: "https://example.com/images/mongodb-documents.jpg",
            description: "Example of MongoDB document and collection structure"
          }
        ]
      },
      quiz: {
        quiz_id: "quiz_4",
        title: "Backend with Node.js Quiz",
        questions: [
          {
            id: 1,
            question: "What is Node.js?",
            type: "multiple_choice",
            options: [
              "A JavaScript framework",
              "A JavaScript runtime environment",
              "A database system",
              "A web browser"
            ],
            correct_answer: 1
          },
          {
            id: 2,
            question: "Which HTTP method is typically used for creating new resources?",
            type: "multiple_choice",
            options: ["GET", "POST", "PUT", "DELETE"],
            correct_answer: 1
          },
          {
            id: 3,
            question: "Complete the Express route: app.___('/users', (req, res) => { res.json(users); });",
            type: "fill_blank",
            question_text: "app.___('/users', (req, res) => { res.json(users); });",
            correct_answer: "get"
          },
          {
            id: 4,
            question: "What is middleware in Express.js?",
            type: "short_answer",
            question_text: "Explain what middleware is in Express.js and provide an example of its use.",
            sample_answer: "Middleware are functions that execute during the request-response cycle. They can modify request/response objects, end the cycle, or call the next middleware. Examples include authentication, logging, and parsing request bodies."
          },
          {
            id: 5,
            question: "Name three advantages of using MongoDB over traditional SQL databases.",
            type: "short_answer",
            question_text: "List and briefly explain three advantages of MongoDB.",
            sample_answer: "1) Schema flexibility - documents don't need fixed structure, 2) Horizontal scaling - easier to scale across multiple servers, 3) Natural JSON format - works well with JavaScript applications"
          }
        ],
        passing_score: 75,
        time_limit: "30 minutes"
      },
      assignment: {
        assignment_id: "assignment_4",
        title: "Full-Stack Blog API with Authentication",
        description: "Build a complete RESTful API for a blog application with user authentication",
        requirements: [
          "Create Express.js server with proper project structure",
          "Implement user registration and login with JWT authentication",
          "Build CRUD operations for blog posts (Create, Read, Update, Delete)",
          "Add user authorization (users can only edit their own posts)",
          "Integrate MongoDB with Mongoose ODM",
          "Implement input validation and error handling",
          "Add middleware for authentication and logging",
          "Create comprehensive API documentation",
          "Include unit tests for key endpoints",
          "Deploy to cloud service (Heroku, Railway, or similar)"
        ],
        submission_format: "GitHub repository with API documentation and deployment link",
        due_date: "End of week 4",
        max_score: 200
      }
    }
  }
];

    useEffect(() => {
      // Simulate API loading delay
      setTimeout(() => {
        setModules(dummyModules);
        setLoading(false);
      }, 1000);
    }, []);

  return (
    <div>
      {/* Course Content */}
      <div className="mt-12">
        {/* Modules Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-blue-600 text-white rounded-lg p-2 mr-3">
              📚
            </span>
            Course Curriculum
          </h2>

          {modules.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No modules available yet</p>
              <p className="text-gray-400 text-sm">
                Course content is being prepared
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.module_id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-4">
                      {module.module_order}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {module.module_title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Module {module.module_order} of {modules.length}
                      </p>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModules;
