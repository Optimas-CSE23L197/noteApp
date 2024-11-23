const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 5000
const dbConnection = require('./config/db')

//import routes
const authRoute = require('./routes/auth.routes');
const noteRoute = require('./routes/note.routes');

app.use(express.static(path.join(__dirname, 'dist')))

//taking cross platform request and send data in json format
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res)=> {
    res.send("hello from server side")
})

//import api routes
app.use('/auth', authRoute);
app.use('/notes', noteRoute);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:5000`);
})