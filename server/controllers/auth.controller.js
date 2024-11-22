const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signup = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        console.log(req.body)
        const user = await userModel.findOne( {email} );
        console.log(user)
    if(user) {
        return res.status(409).json({
            message: "Already have an account",
            success: false
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashPassword
    })

    res.status(200).json({
        message: "Register Successful",
        success: true
    })
    } catch(error){
        return res.status(500).json({
            message: "Error during signup",
            success: false,
            error: error.message
        })
    }
}

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
    const user = await userModel.findOne( {email} );
    if(!user) {
        return res.status(403).json({
            message: "login failed user or password wrong",
            success: false
        })
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
        return res.status(401).json({
            message: "Invalid credentials. Please check your password and try again",
            success: false
        })
    }

    const noteID = user.notes.map(note => note._id);
    console.log(noteID);

    const jwtToken = jwt.sign({
        id: user._id,
        username: user.username,
        noteid: noteID
    }, process.env.JWT_SECRET, {expiresIn: '2h'})

    res.status(200).json({
        message: "Login Successful",
        success: true,
        jwtToken,
        username: user.username,
        id: user._id,
        noteid: noteID
    })

    } catch(error){
        return res.status(500).json({
            message: "Internal sever error"
        })
    }
}

module.exports = {
    signup,login
}