const express = require("express");
const router = express.Router();
const Student = require('../model/student.model.js')
const mongoose = require('mongoose')

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is student get requested",
  });
});

router.post("/", (req, res, next) => {
   const student = new Student({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender
   })
   student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(404).json({
            error:error
        })
    })
  });

module.exports = router;
