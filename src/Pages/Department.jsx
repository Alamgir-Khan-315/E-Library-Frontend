import React, { useEffect, useState } from "react";
import axios from "axios";

const DepartmentCoursesPage = (props) => {
  
  const URL = 'https://e-library-backend-three.vercel.app'
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  
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
    if (selectedDept && selectedSemester) {
      const fetchCourses = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${URL}/api/courses`);
          const filtered = res.data.filter(
            (c) =>
              c.departmentName === selectedDept &&
              c.semesterNo === Number(selectedSemester)
          );
          setCourses(filtered);
        } catch (err) {
          console.error("Error fetching courses:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    }
  }, [selectedDept, selectedSemester]);

  return (
    <div className="min-h-[calc(100vh-12rem)] rounded-xl drop-shadow-xl bg-white px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Department wise course
      </h1>


      <div className="flex flex-wrap gap-3 mb-6 px-6">
        {departments.map((dept) => (
          <button
            key={dept._id}
            onClick={() => {
              setSelectedDept(dept.departmentName);
              setSelectedSemester(null);
              setCourses([]);
            }}
            className={`px-4 py-2 rounded-xl ${
              selectedDept === dept.departmentName
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {dept.departmentName.toUpperCase()}
          </button>
        ))}
      </div>


      {selectedDept && (
        <div className="flex flex-wrap gap-5 mb-6 px-6">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-2 rounded-xl ${
                selectedSemester === sem
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Semester {sem}
            </button>
          ))}
        </div>
      )}


      {loading ? (
        <div className="text-center text-gray-500">Loading courses...</div>
      ) : selectedDept && selectedSemester ? (
        courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-blue-200/20 shadow-lg rounded-lg text-center p-5 hover:shadow-xl bg-purple-100/20 hover:scale-105 transition duration-300"
              >
                <h2 className="text-lg font-bold text-gray-800 my-4">
                  {course.courseName}
                </h2>
                <p className="text-sm text-gray-600 p-2 px-4">
                  <span className="font-medium">Instructor:</span>{" "}
                  {course.instructor}
                </p>

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
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            No courses found for {selectedDept} - Semester {selectedSemester}.
          </div>
        )
      ) : (
        <div className="text-gray-500">
          Please select a department and semester to view courses.
        </div>
      )}
    </div>
  );
};

export default DepartmentCoursesPage;
