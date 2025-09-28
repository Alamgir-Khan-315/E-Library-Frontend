import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="bg-gray-800 text-white py-6 text-center mt-10">
        <p>&copy; {new Date().getFullYear()} E-Library. All Rights Reserved.</p>
        </footer>
    </div>
  )
}

export default Footer