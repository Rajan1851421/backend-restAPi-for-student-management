const express = require("express");
const router = express.Router();
const User = require("../model/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

// all user get route

router.get('/', (req, res, next) => {
    User.find()
      .then((result) => {
        res.status(200).json({
          UserResult: result,
        });
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  });
  


// register user or signup user 


router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(error,hash)=>{
        if(error)
            {
                return res.status(500).json({
                    error:error
                })
            }
            else{
                const user = new User({
                    _id:new mongoose.Types.ObjectId,
                    username:req.body.username,
                    password:hash,
                    phone: req.body.phone,
                    email:req.body.email,
                    userType:req.body.userType
                })
                user.save()
                .then(result=>{
                    res.status(200).json({
                        message:"User Created Successfully",
                        new_user:result
                    })
                })
                .catch(error=>{
                    res.status(500).json({
                        error:error
                    })
                })
            }
    })
})


// login  user route

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
            {
                return res.status(401).json({
                    mesaage:"User does not exist"
                })
            }
            else{
                bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                    if(!result){
                        return res.status(401).json({
                            message:'Wrong Password Please try again'
                        })
                    }
                    else{
                        const token = jwt.sign({
                                username:user[0].username,
                                userType:user[0].userType,
                                email:user[0].email,
                                phone:user[0].phone
                        },process.env.SECRET_KEY,{
                            expiresIn:'24h'
                        }
                    ) 
                    res.status(200).json({
                        message:"Login Successfully",
                        username:user[0].username,
                        userType:user[0].userType,
                        email:user[0].email,
                        phone:user[0].phone,
                        token:token
                    },
                )

                    }
                })
            }
    })
    .catch(error=>{
        res.status(401).json({
            error:error
        })
    })
})


module.exports = router;
