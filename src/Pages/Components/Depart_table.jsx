import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Course_list = () => {

  const URL = 'https://e-library-backend-three.vercel.app'
  const [Department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({
    departmentName: "",
    hod: ""
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${URL}/api/departments`);
        setDepartment(response.data);
        localStorage.setItem('departnments', JSON.stringify(response.data));
      } catch (err) {
        setError("Failed to fetch departments. Please try again later.");
        console.error("Error fetching departments:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepartment();
  }, []);

  
  const handleDelete = async (departmentId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${URL}/api/departments/${departmentId}`);
        setDepartment(Department.filter((d) => d._id !== departmentId));
        window.location.reload();
      } catch (err) {
        console.error("Error deleting department:", err);
        alert("Failed to delete department. Please try again.");
      }
    }
  };

  
  const handleEdit = (dept) => {
    setEditingDept(dept._id);
    setFormData({
      departmentName: dept.departmentName,
      hod: dept.hod
    });
  };


  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/departments/${editingDept}`,
        formData
      );

      alert(res.data.message || "Department updated successfully");

      const updatedList = Department.map((d) =>
        d._id === editingDept ? { ...d, ...formData } : d
      );
      setDepartment(updatedList);
      setEditingDept(null)
    } catch (err) {
      console.error("Error updating department:", err);
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
          <h1 className="text-3xl font-bold text-gray-800">Department List</h1>
          <button
            onClick={toggleTable}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isExpanded ? 'Collapse Table' : 'Expand Table'}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : Department.length > 0 ? (
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead className='text-center'>
                  <tr className="bg-gray-200">
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">Hod</th>
                    <th className="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {Department.map((dept, index) => (
                    <tr key={dept._id || index} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{dept.departmentName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{dept.hod}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(dept)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(dept._id)}
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
          <div className="text-center text-gray-500">No Department found.</div>
        )}
      </div>

      {editingDept && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Update Department</h2>

            <input
              type="text"
              placeholder="Department Name"
              value={formData.departmentName}
              onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="HOD"
              value={formData.hod}
              onChange={(e) => setFormData({ ...formData, hod: e.target.value })}
              className="border p-2 w-full mb-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingDept(null)}
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

export default Course_list;
