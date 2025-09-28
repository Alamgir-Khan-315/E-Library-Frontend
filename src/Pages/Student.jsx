import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  
  const URL = 'https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app'
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptRes = await axios.get(`${URL}/api/departments`);
        setDepartments(deptRes.data);

        const courseRes = await axios.get(`${URL}/api/courses`);
        setCourses(courseRes.data.slice(-6).reverse());
      } catch (err) {
        console.error("Error loading landing data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center rounded-xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome {props.student ? props.student.name : "Guest"} to E-Library 👋
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Explore Courses, Departments, and Resources Anytime, Anywhere
        </p>
        <div className="flex justify-center gap-4">

        {props.student.role === 'student' ? (
        <button
          disabled
          className="bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow cursor-not-allowed"
        >
          Already Logged In
        </button>
      ) : (
        <Link
          to="/log_in"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 hover:scale-105 transition duration-300"
        >
          Login as Student
        </Link>
      )}

        </div>
      </div>


      <div className="py-12 my-12 px-6 drop-shadow-xl border border-gray-200 rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Explore by Department
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading departments...</p>
        ) : departments.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept) => (
              <button
                key={dept._id}
                className="bg-blue-200/20 border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition font-semibold hover:scale-105 text-gray-700"
              >
                {dept.departmentName.toUpperCase()}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No departments found.</p>
        )}
      </div>


      <div className="py-12 my-12 px-6 drop-shadow-xl border border-gray-200 rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Latest Courses
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course) => (
               <div
               key={course._id}
               className="bg-purple-100/20 p-4 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl py-2 font-bold text-center text-gray-800">
                  {course.courseName}
                </h3>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-gray-500 text-sm">
                  {course.departmentName.toUpperCase()} – Semester {course.semesterNo}
                </p>
               
                { props.student?.role === "student" || props.student?.role ===  'admin' ? (
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No courses available.</p>
        )}
      </div>
     
    </div>
  );
};

export default LandingPage;
