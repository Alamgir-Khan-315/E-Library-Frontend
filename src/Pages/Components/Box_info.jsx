import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Add_depart from './Add_depart'
import Add_course from './Add_course';

const Box_info = () => {
  
  const URL = 'https://e-library-backend-eiuajc1qh-alamgir-khan-aks-projects.vercel.app'
  const [totalStudents, setTotalStudents] = useState(0);
  const [TotalDepartments, setTotalDepartments] = useState(0);
  const [TotalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${URL}/api/users`);
        setTotalStudents(response.data.length);
      } catch (err) {
        console.error("Error fetching student count:", err);
      }
    };

    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${URL}/api/departments`);
        setTotalDepartments(response.data.length);
      } catch (err) {
        console.error("Error fetching departments count:", err);
      }
    };
   
    const TotalCourses = async () => {
      try {
        const response = await axios.get(`${URL}/api/courses`);
        setTotalCourses(response.data.length);
      } catch (err) {
        console.error("Error fetching departments count:", err);
      }
    };

    fetchStudents();
    fetchDepartment()
    TotalCourses()
  }, []);

  return (
    <div className='flex flex-row gap-5'>

      <div className='box-count'>
        <h1 className='text-lg font-semibold text-gray-700'>No of Students</h1>
        <h1 className='text-4xl font-bold text-gray-900 mt-2'>{totalStudents}</h1>
      </div>

      <div className='box-count flex justify-around items-center '>
       <div className="box_info">
        <h1 className='text-lg font-semibold text-gray-700'>No of Departs</h1>
        <h1 className='text-4xl font-bold text-gray-900 mt-2'>{ TotalDepartments }</h1>
       </div>
        <Add_depart />
      </div>

       <div className='box-count flex justify-around items-center '>
       <div className="box_info">
        <h1 className='text-lg font-semibold text-gray-700'>No of Courses</h1>
        <h1 className='text-4xl font-bold text-gray-900 mt-2'>{ TotalCourses }</h1>
       </div>
        <Add_course />
      </div>

    </div>
  );
};

export default Box_info;
