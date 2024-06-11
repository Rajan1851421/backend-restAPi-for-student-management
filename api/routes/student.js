const express = require("express");
const router = express.Router();
const Student = require("../model/student.model.js");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({
        studentResult: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        eroor: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  });

  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        newStudent: result,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        res.status(409).json({
          message: "Email already exists",
          error: error,
        });
      } else {
        res.status(500).json({
          message: "An error occurred",
          error: error,
        });
      }
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        student: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

// delete request

router.delete("/:id", (req, res, next) => {
  // console.log("Del:", req.params.id);
  Student.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Successfully Deleted",
          student: result,
        });
      } else {
        res.status(404).json({
          message: "Student not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});


module.exports = router;
