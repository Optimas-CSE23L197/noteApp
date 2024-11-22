import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/login')
    }

  return (
    <div className='home bg-gray-300 p-3 h-screen w-full'>
        <nav className='p-3 flex justify-between items-center bg-white rounded-md'>
            <h1 className='logo ml-10 text-[2rem] font-bold text-purple-700 cursor-pointer hover:text-purple-900'>Notes.</h1>
            <div className="button w-[200px] flex items-center justify-center gap-6">
                <Link to='/login' className='login bg-purple-600 px-3 py-2 rounded-lg text-white font-semibold hover:bg-purple-700'>Login</Link>
                <Link to='/signup' className='signup bg-purple-600 px-3 py-2 rounded-lg text-white font-semibold hover:bg-purple-700'>Signup</Link>
            </div>
        </nav>


        <div className="main mt-[50px] h-[550px] w-full bg-white flex flex-col justify-center items-center rounded-md">
            <h1 className='bodyText text-purple-600 hover:text-purple-900 v text-[3rem] font-bold cursor-pointer'>Welcome to Notes App</h1>
            <span className='bodySubText text-[2rem] font-semibold'>Here You can Create Note</span>
            <button onClick={handleNavigate} className='bg-purple-600 px-3 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 mt-2'>GET START</button>
            <a href="/dashboard">GO</a>
        </div>
    </div>
  )
}

export default Home