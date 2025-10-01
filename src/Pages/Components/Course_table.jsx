import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {

  const URL = 'https://e-library-backend-three.vercel.app'
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    departmentName: "",
    semesterNo: "",
    courseName: "",
    pdf_url: "",
    instructor: "",
  });

  useEffect(() => {
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

  
  const handleEdit = (course) => {
    setEditingCourse(course.courseName); 
    setFormData({
      departmentName: course.departmentName,
      semesterNo: course.semesterNo,
      courseName: course.courseName,
      pdf_url: course.pdf_url,
      instructor: course.instructor,
    });
  };
  
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/courses/${editingCourse}`,  
        formData
      );
  
      alert(res.data.message || "Course updated successfully");
  
      setCourses((prev) =>
        prev.map((c) =>
          c.courseName === editingCourse ? { ...c, ...formData } : c
        )
      );
  
      setEditingCourse(null);
    } catch (err) {
      console.error("Error updating course:", err);
      alert(err.response?.data?.message || "Update failed");
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
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Pdf URL
                    </th>
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
                      <td className="px-5 py-5 flex flex-row border-b border-gray-200 bg-white text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
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


      {editingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Update Course</h2>

            <input
              type="text"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={(e) =>
                setFormData({ ...formData, courseName: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Department"
              value={formData.departmentName}
              onChange={(e) =>
                setFormData({ ...formData, departmentName: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              type="number"
              placeholder="Semester No"
              value={formData.semesterNo}
              onChange={(e) =>
                setFormData({ ...formData, semesterNo: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="PDF URL"
              value={formData.pdf_url}
              onChange={(e) =>
                setFormData({ ...formData, pdf_url: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingCourse(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
