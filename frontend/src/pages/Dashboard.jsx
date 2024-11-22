import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { IoAddSharp } from "react-icons/io5";
import Notecard from "../components/Notecard";
import { handleError,handleSuccess } from "../utils/utils";

function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const [noteInfo, setNoteInfo] = useState({
    title: '',
    content: '',
    isPinned: 'false'
  })

  //add new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    const {title,content} = noteInfo
    if(!title && !content) {
      handleError("title and content required");
    }
    const userId = localStorage.getItem('userid')
    if(!userId) {
      handleError("userid not found");
    }

      try {
        const url = `http://localhost:5000/notes/add/${userId}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }, body: JSON.stringify(noteInfo)
        })
        const result = await response.json()
        const {success, error, message} = result
        if(success) {
          handleSuccess(message);
          setToggle(false);
          setNoteInfo({title: '', content: '', isPinned: 'false'})
          setTimeout(()=>{
            window.location.reload()
          },1000)
        } else if(error) {
          handleError(error)
        }

      } catch(error) {
        handleError(error.message)
      }
  }

  //catch handle change
  const handleChange = (e) => {
    const {name,value} = e.target;
    const copyNoteInfo = {...noteInfo}
    copyNoteInfo[name] = value
    setNoteInfo(copyNoteInfo)
  }
  console.log(noteInfo);
  

  //open popup
  const popup = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="dashboardBody relative h-screen w-full p-4 bg-gray-300">
      <Navbar />
      <div className=" mt-8">
        <div className="flex">
          <Notecard />
        </div>
      </div>
      {/* Add Button */}
      <div className="addbutton h-[70px] w-[70px] bg-blue-600 absolute bottom-10 right-[80px] flex items-center justify-center rounded-2xl hover:bg-blue-800">
        <button onClick={popup} className="text-white text-[3rem]">
          <IoAddSharp />
        </button>
      </div>

      {/* Popup Form */}
      {toggle && (
        <div className="takeinput fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="popup-content h-[500px] w-[700px] bg-white rounded-lg shadow-xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={popup}
              className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
            >
              X
            </button>

            <form onSubmit={handleAddNote}>

              <div className="title mb-4">
                <h2 className="text-lg font-bold mb-2">Title</h2>
                <input
                onChange={handleChange}
                value={noteInfo.title}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="text" name="title" id="tile" placeholder="Write Title"/>
              </div>

              <div className="content mb-4">
                <h2 className="text-[18px] font-bold mb-2">Content</h2>
              <textarea 
              value={noteInfo.content}
              onChange={handleChange}
                name="content"
                className="w-full h-[200px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write something..."
              ></textarea>
              </div>

              <div className="button">
              <button type="submit" className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
