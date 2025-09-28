import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseCards = (props) => {
  
  const URL = 'https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app'
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${URL}/api/courses`);
        setCourses(res.data);
        setFilteredCourses(res.data);
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

  
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${URL}/api/departments`);
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  
  useEffect(() => {
    if (selectedDept === "all") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(c => c.departmentName === selectedDept));
    }
  }, [selectedDept, courses]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Course List</h1>


        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="border rounded px-3 py-2 text-gray-700"
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.departmentName}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 drop-shadow-lg">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-purple-100/20 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="p-5 md:w-[80%] md:mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 my-4 text-center">
                  {course.courseName}
                </h2>
                
                <div className="body_text my-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span> {course.departmentName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Semester:</span> {course.semesterNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Instructor:</span> {course.instructor}
                  </p>
                </div>

               <div className="btn items-center justify-center flex">
               
               {props.student?.role === "student" || props.student?.role ===  'admin' ? (
                  course.pdf_url && (
                    <a
                      href={course.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block primary-btn"
                    >
                      View PDF
                    </a>
                  )
                ) : (
                  <button className="mt-4 inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded">
                    Log in to get PDF
                  </button>
                )}

               </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No courses found for this department.</div>
      )}
    </div>
  );
};

export default CourseCards;
