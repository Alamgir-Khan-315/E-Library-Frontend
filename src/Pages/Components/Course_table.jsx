import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    
  const URL = 'https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app'
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${URL}/api/courses`);
        setCourses(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${URL}/api/courses/${courseId}`);
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
        window.location.reload();
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const toggleTable = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Course List</h1>
          <button
            onClick={toggleTable}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isExpanded ? "Collapse Table" : "Expand Table"}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : courses.length > 0 ? (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead className="text-center">
                  <tr className="bg-gray-200">
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                      Department
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Semester No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider"> Course Name </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider"> Pdf URL </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {courses.map((course, index) => (
                    <tr
                      key={course._id || index}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {course.departmentName}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {course.semesterNo}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {course.courseName}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {course.pdf_url}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {course.instructor}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No courses found.</div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
