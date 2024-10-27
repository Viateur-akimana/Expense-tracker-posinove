import React, { useState,useEffect } from 'react'
import {getLoggedInUser, logout} from "../utils/lib"
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate=useNavigate()
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    const user = getLoggedInUser(); 
    setUsername(user);
  }, []);

 const handleLogout =()=>{
    logout()
    navigate('/login')
 }
  return (
    <nav className="bg-green-700 text-white shadow-md p-4 flex justify-between items-center px-4 md:px-20">
    <h1 className="text-3xl font-extrabold tracking-wide">
      Expense Tracker
    </h1>
    <div className="flex items-center space-x-4">
      <span className="text-lg">Welcome, {username || 'User'} 👋</span>
      <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg transition duration-200" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </nav>
  )
}

export default Navbar