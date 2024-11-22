const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    createOn: {
        type: Date,
        default: Date().now
    }
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [noteSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
