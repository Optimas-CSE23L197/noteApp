import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils/utils';
import { ToastContainer } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState('');

  //const namePart = loggedInUser.trim().split(' ');
  //const initials = namePart.length > 1 ? `${namePart[0][0]}${namePart[namePart.length - 1][0]}`.toUpperCase() : `${namePart[0][0]}`.toUpperCase();

  
  useEffect(()=> {
    setloggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogOut = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("Logout Successful");
    setTimeout(()=> {
      navigate('/login');
    },2000)
  }


  return (
    <div>
      <nav className="navBody p-3 flex justify-between items-center bg-white rounded-md w-full">
        {/* Logo */}
        <h1 className="navText ml-10 text-[2rem] font-bold text-purple-700 cursor-pointer hover:text-purple-900">
          Notes.
        </h1>

        {/* Search Bar */}
        <div className="search">
          <input
            className="border bg-gray-300 w-[500px] border-black p-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="search"
            name="search"
            id="search"
            placeholder="Search notes"
          />
        </div>

        {/* User Details and Logout */}
        <div className="navbtn w-[400px] flex items-center justify-end gap-6 mr-10">
          {/* User Details */}
          <div className="details w-[250px] flex justify-end items-center gap-4">
            <h1 className='shortName text-[20px] text-white font-bold bg-purple-600 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-900'>AK</h1>
            <h3 className="longName text-[1.3rem] font-medium text-gray-800">
              {loggedInUser}
              Animesh Karan
            </h3>
          </div>

          {/* Logout Button */}
          <button
          onClick={handleLogOut}
            className="logout bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 transition">
            Logout
          </button>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
