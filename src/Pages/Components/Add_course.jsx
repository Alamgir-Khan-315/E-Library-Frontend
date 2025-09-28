import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Add_course = () => {
  const URL = 'https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app'
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    departmentName: "",
    semesterNo: "",
    courseName: "",
    instructor: "",
    pdf_url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/courses`, form);
      alert("Course added successfully!");
      setIsOpen(false);
      setForm({
        departmentName: "",
        semesterNo: "",
        courseName: "",
        pdf_url: "",
        instructor: "",
      });
      window.location.reload();
    } catch (err) {
      console.error("Error adding course:", err);
      alert("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="departmentName"
                value={form.departmentName}
                onChange={handleChange}
                placeholder="Department Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="semesterNo"
                value={form.semesterNo}
                onChange={handleChange}
                placeholder="Semester Number"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                placeholder="Course Name"
                className="w-full border p-2 rounded"
                required
              />
               <input
                type="url"
                name="pdf_url"
                value={form.pdf_url}
                onChange={handleChange}
                placeholder="PDF URL"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Instructor"
                className="w-full border p-2 rounded"
                required
              />
             

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add_course;
