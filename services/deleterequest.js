const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const Post =require('../models/cabRequests');
const passport = require("passport");

router.route('/').post((req,res)=>{
    const request=new Post({
        msg:  req.body.msg,
        name: req.body.name,
        date: req.body.date,
        email : req.body.email       
    });
    console.log(request);
    Post.findOneAndDelete({msg:request.msg,name:request.name,date:request.date,email:request.email},(err)=>{
        if(err){console.log(err)}
        else{
            console.log("Succesfully deleted");
        }
    })
})

module.exports  =router;