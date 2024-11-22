import React, { useEffect, useState } from 'react';
import { MdOutlinePushPin, MdOutlineDeleteOutline } from "react-icons/md";
import { TbPencilExclamation } from "react-icons/tb";
import { handleError, handleSuccess } from '../utils/utils';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Notecard() {
    const navigate = useNavigate();
    const [showNotes, setShowNotes] = useState([]);
    const [loggedInUser, setloggedInUser] = useState('');
    const [newNoteInfo, setNewNoteInfo] = useState({
        title: '',
        content: '',
        isPinned: 'false'
    });
    const [updateNote, setUpdateNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);

    const changeNote = (note) => {
        setUpdateNote(true);
        setNoteToEdit(note); // Store the note being edited
        setNewNoteInfo({
            title: note.title,
            content: note.content
        });
    };

    // Fetch notes from the database
    const fetchNotes = async () => {
        const userId = localStorage.getItem('userid');
        if (!userId) {
            return handleError('User not found');
        }
        try {
            const url = `http://localhost:5000/notes/${userId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setShowNotes(result.notes || []);
        } catch (error) {
            handleError(error.message);
        }
    };

    // Handle note edit
    const handleEdit = async (e, noteId) => {
        e.preventDefault();
        const { title, content } = newNoteInfo;
        const userId = localStorage.getItem('userid');
        if (!noteId || !userId) {
            return handleError("userid and noteid not found");
        }

        try {
            const url = `http://localhost:5000/notes/update/${userId}/${noteId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNoteInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setUpdateNote(false);
                setShowNotes(prev => prev.map(note => note._id === noteId ? { ...note, title, content } : note));
                setTimeout(()=> {
                    navigate('/dashboard')
                },100)
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    // Delete note from database
    const onDelete = async (noteId) => {
        const userId = localStorage.getItem('userid');
        if (!noteId || !userId) {
            return handleError("userid and noteid not found");
        }

        try {
            const url = `http://localhost:5000/notes/delete/${userId}/${noteId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setShowNotes(prev => prev.filter(note => note._id !== noteId));
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNoteInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchNotes();
        setloggedInUser(localStorage.getItem('loggedInUser'))
    }, []);

    return (
        <div className='noteBody flex items-center gap-4'>
            {showNotes.length > 0 ? (
                showNotes.map((note, index) => (
                    <div key={index} className="card h-fit w-[500px] bg-white rounded-md shadow-2xl p-3 mb-4">
                        <div className="title flex items-center justify-between">
                            <h2 className="font-bold text-[15px]">Title: {note.title}</h2>
                        </div>

                        <div className="date">
                            <span className="font-semibold text-[12px]">Date: {note.createOn ? moment(note.createOn).format('MMMM DD, YYYY') : 'No date provided'}</span>
                        </div>

                        <div className="content">
                            <p className="text-[13px]">{note.content || 'No content available'}</p>
                        </div>

                        <div className="button flex items-center justify-between mt-5">
                            <span className='text-gray-500 text-[8px]'>Note Created by {loggedInUser}</span>
                            <div className="edit flex gap-1">
                                <button onClick={() => changeNote(note)}>
                                    <TbPencilExclamation className="text-[20px] hover:text-green-500 cursor-pointer text-purple-500" />
                                </button>

                                {updateNote && noteToEdit && noteToEdit._id === note._id && (
                                    <div className="takeinput fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="popup-content h-[500px] w-[700px] bg-white rounded-lg shadow-xl p-6 relative">
                                            <button
                                                onClick={() => setUpdateNote(false)}
                                                className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
                                            >
                                                X
                                            </button>

                                            <form onSubmit={(e) => handleEdit(e, note._id)}>

                                                <div className="title mb-4">
                                                    <h2 className="text-lg font-bold mb-2">Title</h2>
                                                    <input
                                                        onChange={handleChange}
                                                        value={newNoteInfo.title}
                                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                        type="text" name="title" placeholder="Write Something..." />
                                                </div>

                                                <div className="content mb-4">
                                                    <h2 className="text-[18px] font-bold mb-2">Content</h2>
                                                    <textarea
                                                        onChange={handleChange}
                                                        value={newNoteInfo.content}
                                                        name="content"
                                                        className="w-full h-[200px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                        placeholder="Write something..."
                                                    ></textarea>
                                                </div>

                                                <div className="button">
                                                    <button type="submit" className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                <button onClick={() => onDelete(note._id)}>
                                    <MdOutlineDeleteOutline
                                        className="text-[20px] hover:text-red-500 cursor-pointer text-purple-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No notes available</p>
            )}
        </div>
    );
}

export default Notecard;
