const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("database is connected successfully");
})
.catch((error)=> {
    console.error("database connection falied", error)
})

module.exports = connection