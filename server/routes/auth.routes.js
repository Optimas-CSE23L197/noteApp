const express = require('express')
const route = express.Router()
const {signupValidation,loginValidation} = require('../middlewares/auth.middleware')
const {signup,login} = require('../controllers/auth.controller')

route.post('/login', loginValidation, login);
route.post('/signup', signupValidation, signup)


module.exports = route