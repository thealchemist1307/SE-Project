const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const Events = require('../models/Events');


router.route('/suggest').post((req,res)=>{
    const newEvents = new Events({
        eventName : req.body.name,
        eventAddr :req.body.addr,
        status : req.body.status    
    });
    newEvents.save().then(post=>res.json(post));
    console.log("Event request sucessfully submitted");
});

router.route('/get').get((req,res)=>{
    Events.find({ status : "1" })
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.route('/getall').get((req,res)=>{
    Events.find({})
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.route('/delete').post((req,res)=>{
    const deleteEvent = new Events({
        eventName : req.body.eventName,
        eventAddr :req.body.eventAddr,
        status : req.body.status    
    });
    console.log(deleteEvent);
    Events.findOneAndDelete({eventName : deleteEvent.eventName, eventAddr : req.body.eventAddr},(err)=>{
        if(err){console.log(err)}
        else{
            console.log("Succesfully deleted");
        }
    })
})

router.route('/approve').post((req,res)=>{
    const queryevent = {
        'eventName' : req.body.eventName,
        'eventAddr' : req.body.eventAddr,
    }
    Events.findOneAndUpdate(queryevent,{status:"1"},(err)=>{
        if(err){console.log(err)}
        else{
            console.log("succesful updation!")
        }
    })

})

module.exports=router;