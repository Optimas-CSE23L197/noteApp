const userModel = require('../models/user.model')


const displayNote = async (req,res) => {
    const {userId} = req.params
    if(!userId) {
        return res.status(400).json({
            message: "user id not found",
            success: false
        })
    }

    try {

        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

    if(!user.notes || user.notes.length === 0) {
        return res.status(200).json({
            message: "No notes found. Please add some notes",
            success: true,
            notes: []
        })
    }

    res.status(200).json({
        message: "Note Display successful",
        success: true,
        notes: user.notes
    })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

const addNote = async (req,res) => {
    const {userId} = req.params
    if(!userId) {
        return res.status(400).json({
            message: "user id not found",
            success: false
        })
    }

    try {

        const {title,content,isPinned} = req.body
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const newNote = {
            title: title,
            content: content,
            isPinned: isPinned || false,
            userId: userId,
            createOn: new Date()
        }

        user.notes.push(newNote);
        await user.save()
        res.status(200).json({
            message: "Note added successfully",
            success: true
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const updateNote = async (req, res) => {
    const { userId, noteId } = req.params;
    if (!userId || !noteId) {
        return res.status(400).json({
            message: "User ID or Note ID not found",
            success: false
        });
    }

    try {
        const { title, content, isPinned } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //find element from a array
        const findNoteIndex = user.notes.findIndex(note => note._id.toString() === noteId);
        if (findNoteIndex === -1) {
            return res.status(404).json({
                message: "Note not found",
                success: false
            });
        }

        //change value means update details of an array
        const updatedNote = {
            title: title || user.notes[findNoteIndex].title,
            content: content || user.notes[findNoteIndex].content,
            isPinned: isPinned !== undefined ? isPinned : user.notes[findNoteIndex].isPinned,
            createOn: user.notes[findNoteIndex].createOn,
            userId: user._id
        };

        // Correctly update the note in the user's notes array
        user.notes[findNoteIndex] = updatedNote;
        await user.save();

        res.status(200).json({
            message: "Note updated successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Note update failed",
            success: false,
            error: error.message
        });
    }
};

const deleteNote = async (req, res) => {
    const { userId, noteId } = req.params;
    if (!userId || !noteId) {
        return res.status(400).json({
            message: "User ID or Note ID not found",
            success: false
        });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //delete from array
        const findNoteIndex = user.notes.findIndex(note => note._id.toString() === noteId);
        if (findNoteIndex === -1) {
            return res.status(404).json({
                message: "Note not found",
                success: false
            });
        }

        user.notes.splice(findNoteIndex,1);

        await user.save();
        res.status(200).json({
            findNoteIndex,
            message: "Note delete successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Note delete failed",
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    displayNote,addNote,updateNote,deleteNote
}