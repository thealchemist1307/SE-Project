const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Notif = require("../models/Notification");

const Post = require("../models/sharingRequests");
router.route("/update").post(function (req, res) {
    const newRequest = new Post({
        id: req.body.id,
        status: req.body.status
    });
    Notif.findOneAndUpdate(
        { name: newRequest.member1 },
        { $push: { msg:newRequest.member2+" has accepted your request"  } },
        { upsert: true }
      );
    
        Post.findOneAndUpdate({ id: newRequest.id }, { $set: { status: newRequest.status } }, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });
        
    });
module.exports = router;
