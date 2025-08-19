import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",  //name should match with db name
    price: "",
    level: "",
    category: "",
    thumbnail: null,
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCourse({ ...course, thumbnail: e.target.files[0] });
    }
  };

  const handleRemoveImage = () => {
    setCourse({ ...course, thumbnail: null });
  };

  const resetForm = () => {
    setCourse({
      title: "",
      description: "",
      instructor: "",
      price: "",
      level: "",
      category: "",
      thumbnail: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //  backend call

    try {
      if (!course.thumbnail) {
        throw new Error("Thumbnail is required.");
      }

      console.log("Course Submitted:", course);

      setSuccess("Course added successfully!");
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong while submitting.");
    }
  };

  // Auto clear after 5s
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-blue-50 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Add New Course
        </h2>

        {/* Error / Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course description"
              required
            ></textarea>
          </div>

          {/* Instructor Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              name="instructor"
              value={course.instructor}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course price"
              required
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Level</label>
            <select
              name="level"
              value={course.level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={course.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course category"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Course Thumbnail
            </label>
            {!course.thumbnail ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-white mt-2">
                <p className="text-sm text-gray-600">{course.thumbnail.name}</p>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;



/* import React, { useState } from "react";
import { Upload } from "lucide-react"; 

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "", // name -(must match DB record)
    price: "",
    level: "",
    category: "",
    thumbnail: null, //  thumbnail: File { name: "thumbnail.jpg", size: 24123, type: "image/jpeg" }--thumbnail is a File object, not a URL yet
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, thumbnail: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Submitted:", course);
    //later connect to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-blue-50 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course title"
              required
            />
          </div>

        
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              name="instructor"
              value={course.instructor}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>


          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Level</label>
            <select
              name="level"
              value={course.level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

     
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={course.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter course category"
              required
            />
          </div>

    
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Course Thumbnail
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="thumbnail"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {course.thumbnail && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {course.thumbnail.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
 */