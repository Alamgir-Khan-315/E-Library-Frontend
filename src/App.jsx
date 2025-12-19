import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Log_in from "./Pages/Log_in";
import HomePage from "./Pages/Home";
import Library from "./Pages/Library";
import Profile from "./Pages/Profile";
import Department from "./Pages/Department";
import Footer from "./Components/Footer";

import ChatAssistant from "./Components/Chat";
import OCR from "./Components/OCR";

export default function App() {
  const [student, setStudent] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (student) setStudent(student);
  }, []);

  return (
    <div className="main relative min-h-screen">
      <div className="container mx-auto pt-[5rem]">
        <Navbar student={student} />

        <Routes>
          <Route path="/" element={<HomePage student={student} />} />
          <Route path="/department" element={<Department student={student} />} />
          <Route path="/library" element={<Library student={student} />} />
          <Route path="/profile" element={<Profile student={student} />} />
          <Route path="/log_in" element={<Log_in />} />
          <Route path="/ocr" element={<OCR />} />
        </Routes>
      </div>

      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl z-40"
      >
        💬
      </button>

      {showChat && <ChatAssistant onClose={() => setShowChat(false)} />}

      <Footer />
    </div>
  );
}
