const express = require('express')
const noteValidation = require('../middlewares/note.middleware')
const { loginValidation } = require('../middlewares/auth.middleware')
const {displayNote,addNote,updateNote, deleteNote} = require('../controllers/note.controller')
const route = express.Router()

route.get('/:userId', displayNote) //to display all notes
route.post('/add/:userId', noteValidation, addNote) //to create new notes
route.put('/update/:userId/:noteId', noteValidation, updateNote) //to update existing notes
route.delete('/delete/:userId/:noteId', deleteNote) //to delete a note

module.exports = route