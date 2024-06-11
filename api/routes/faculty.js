const express = require("express");
const router = express.Router();
const Faculty = require('../model/faculty.model.js')
const mongoose = require('mongoose')

router.get("/", (req, res, next) => {
  Faculty.find()
  .then(result=>{
    res.status(200).json({
      FaculityList : result
    })
  })
  .catch(error=>{
    res.status(500).json({
      error:error
    })
  })
});

router.post("/", (req, res, next) => {
  const faculty = new Faculty({
   _id:new mongoose.Types.ObjectId,
   name:req.body.name,
   subject:req.body.subject,
   email:req.body.email,
   phone:req.body.phone,
   gender:req.body.gender
  })
  faculty.save()
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

 router.get('/:id',(req,res,next)=>{
  console.log(req.params.id);
  Faculty.findById(req.params.id)
  .then(result=>{
    res.status(200).json({
      Faculty:result
    })
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      error:error
    })
  })
 })

// delete request

router.get('/:id',(req,res,next)=>{
  Faculty.findOneAndDelete({_id:req.params.id})
  .then((result)=>{
    if (result) {
      res.status(200).json({
        message:'Successfuly Deleted',
        Faculty:result
      })
    }else{
      res.status(404).json({
        message: "Faculity not found",
      });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  });
})



module.exports = router;
