const express = require('express')
const app = express()
const studentRoute = require('./api/routes/student.js')
const facultyRoute = require('./api/routes/faculty.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();



mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on('error',error =>{
    console.log("connection failed");
})
mongoose.connection.on('connected',connected =>{
    console.log("Database connected.......");
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/student',studentRoute)
app.use('/faculty',facultyRoute)


app.use((req,res,next)=>{
    res.status(404).json({
        error:"Bad Request"
    })
})

module.exports = app