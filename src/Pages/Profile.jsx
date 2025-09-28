import React, { useState } from 'react';
import axios from 'axios';


const Profile = (props) => {
    
  const URL = 'https://e-library-backend-three.vercel.app'
  const initialStudent = props.student || {};
  const [formData, setFormData] = useState({
    name: initialStudent.name || '',
    password: '',
    role: initialStudent.role || 'student',
    department: initialStudent.department || '',
    semester: initialStudent.semester || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentName = initialStudent.name; 
      const response = await axios.put(`${URL}/api/users/${studentName}`, formData);

      if (response.status === 200) {
        console.log('success');
        alert('Profile updated successfully!');
        setFormData(prevData => ({ ...prevData, password: '', role: 'student', department: '', semester: '' }));
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      alert('Failed to update profile. Please check the network connection.');
      console.error('Update API call failed:', error);
    } 
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-sm text-gray-500 ">
            Welcome, <span className="font-semibold">{initialStudent.name || 'Guest'}</span>! Update your account information.
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                 className="input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                disabled
                 className="input"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
            <div className="mt-1">
              <input
                id="department"
                name="department"
                type="text"
                required
                value={formData.department}
                onChange={handleChange}
                 className="input"
              />
            </div>
          </div>


          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Semester</label>
            <div className="mt-1">
              <input
                id="semester"
                name="semester"
                type="text"
                required
                value={formData.semester}
                onChange={handleChange}
                 className="input"
              />
            </div>
          </div>


          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
