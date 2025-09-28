import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar"
import Log_in from "./Pages/Log_in"
import HomePage from './Pages/Home'
import Library from "./Pages/Library";
import Profile from "./Pages/Profile";
import Department from './Pages/Department'
import Footer from "./Components/Footer";




export default function App() {

  const [student, setStudent] = useState("");

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    console.log(student);
    if (student) {
      setStudent(student);
    }
  }, []);

  return (
    <div className="main">

      <div className="container mx-auto pt-[5rem]">
      <Navbar student={student}/>

        <Routes>
          <Route path="/" element={< HomePage student={student}/>} />
          <Route path="/department" element={< Department student={student} />} />
          <Route path="/library" element={< Library student={student}/>} />
          <Route path="/profile" element={< Profile student={student} />} />
          <Route path="/log_in" element={< Log_in />} />
        </Routes>

      </div>

      <Footer className='fixed h-screen bottom-0 ' />

    </div>
  )
}