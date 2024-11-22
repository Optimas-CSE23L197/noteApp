import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {handleError, handleSuccess} from '../utils/utils'
import { ToastContainer } from 'react-toastify';

function Signup() {

    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
      username: '',
      email: '',
      password: '',
    })

    const handleSignup = async (e) => {
      e.preventDefault();
      if(!username || !email || !password) {
        return handleError("email password or name is miss match")
      }

      try {
        const url = 'http://localhost:5000/auth/signup'
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupInfo)
        })

        const result = await response.json();
        const {success,message,error} = result;
        if(success) {
          handleSuccess(message);
          setTimeout(()=> {
            navigate('/login');
          }, 3000)
        } else if(error) {
          handleError(message)
        }

      } catch(error) {
        handleError(error)
      }
    }

    const handleChange = (e) => {
      const {name,value} = e.target
      const copySignupInfo = {...signupInfo};
      copySignupInfo[name] = value;
      setSignupInfo(copySignupInfo);
    }

    console.log(signupInfo);

  return (
    <div className="signupMain h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="signupContainer h-[550px] w-[500px] bg-blue-600 rounded-lg shadow-2xl flex flex-col items-center p-5">
        <h1 className="signuptext text-white text-2xl font-bold mb-4">Signup</h1>
        <form onSubmit={handleSignup}
          className="signupForm w-full flex flex-col items-center space-y-4"
        >
          <div className="flex flex-col w-[80%]">
            <label
              htmlFor="username"
              className="usernameLable text-white font-semibold text-[1.2rem] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your Name"
              value={signupInfo.username}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300"
            />
          </div>

          <div className="flex flex-col w-[80%]">
            <label
              htmlFor="email"
              className="emailLable text-white font-semibold text-[1.2rem] mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="yourname@gmail.com"
              value={signupInfo.email}
              onChange={handleChange}
              required
              className="p-2 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col w-[80%]">
            <label
              htmlFor="password"
              className="passwordLable text-white font-semibold text-[1.2rem] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              value={signupInfo.password}
              required
              className="p-2 rounded border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded shadow hover:bg-gray-100"
          >
            Signup
          </button>
          <span className='text-[18px] text-white'>Already Have An Account? <a className='text-black hover:text-white' href="/login">Login</a></span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
