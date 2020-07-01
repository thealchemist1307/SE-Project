const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const Post =require('../models/CarPool');
const passport = require("passport");

router.route('/').post((req,res)=>{
    const request={
        id:  req.body.id,
        name: req.body.name,
        email : req.body.email       
    }
    console.log(request);
    Post.findOneAndUpdate(
        {id:request.id},
       { $pull: { members:request.name,email:request.email }},{ upsert: true },function(err,model){
          if(err){
               console.log(err);
            }
            console.log("Delete Name Successful")
        }).exec();
    })
module.exports  =router;