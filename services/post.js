const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const Post =require('../models/cabRequests');
const passport = require("passport");
const Notif =require('../models/cabRequests');
router.route('/request').post((req,res)=>{
    const newRequest=new Post({
        msg:  req.body.msg,
        name: req.body.name,
        date: req.body.date,
        email : req.body.emailID,  
        from:req.body.from,
        to:req.body.to     
    });
    
    newRequest.save().then(post=>res.json(post));
    console.log("Request sucessfully submitted");
});



module.exports  =router;