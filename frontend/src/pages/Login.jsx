import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError,handleSuccess } from '../utils/utils';
import { ToastContainer } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email,password} = LoginInfo;
    if(!email || !password) {
      return handleError("Email or Password required");
    }

    try {
      const url = 'http://localhost:5000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(LoginInfo)
      })

      const result = await response.json();
      const {success,error,message, jwtToken, username, id, noteid} = result;
      if(success) {
        handleSuccess(message);
        localStorage.getItem('token', jwtToken);
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('userid', id)
        localStorage.setItem('noteid', noteid)
        setTimeout(()=> {
          navigate('/dashboard')
        },3000)
      } else if(error) {
        const details = error?.details[0].message || "An error occurred";
        handleError(details);
      } else if(!success) {
        handleError(message)
      }

    } catch(error) {
      console.error(error);
      handleError("Something went wrong. Please try again later");
    }
  }


  const handleChange = (e) =>{
    const {name,value} = e.target;
    const copyLoginInfo = {...LoginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  console.log(LoginInfo)
  return (
    <div className="loginMain h-screen w-full bg-gray-300 flex items-center justify-center">
      <div className="loginContainer h-[400px] w-[500px] bg-purple-600 rounded-lg shadow-2xl flex flex-col items-center p-5">
        <h1 className="logintext text-white text-2xl font-bold mb-4">Login</h1>
        <div className="form h-[300px] w-full flex flex-col justify-center items-center">
          <form onSubmit={handleLogin} className="loginForm w-full flex flex-col items-center space-y-4">
            <div className="email flex flex-col w-[80%]">
              <label
                className="emailLable text-white font-semibold text-[1.2rem] mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={LoginInfo.email}
                required
                placeholder="yourname@gmail.com"
                className="p-2 rounded border border-gray-300 outline-none"
              />
            </div>
            <div className="password flex flex-col w-[80%]">
              <label
                className="passwordLable text-white font-semibold text-[1.2rem] mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={LoginInfo.password}
                required
                placeholder="***********"
                className="p-2 rounded border border-gray-300 outline-none"
              />
              <span className='flex justify-end'><a className='text-[15px] mt-2 text-black hover:text-white' href="#">Forget Password</a></span>
            </div>
            <button
              type="submit"
              className="bg-white text-purple-600 font-bold py-2 px-6 rounded shadow hover:bg-gray-100"
            >
              Login
            </button>
            <span className='text-white text-[18px]'>Don't have an account? <a className='text-white hover:text-black' href="/signup">Signup</a></span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
