const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/sharingRequests");
const passport = require("passport");
const Notif = require("../models/Notification");

router.route("/request").post((req, res) => {
  const newRequest = new Post({
      id:req.body.id,
      requestor: req.body.requestor,
      requestee: req.body.requestee,
      email:req.body.email,
      msg: req.body.msg,
      date: req.body.date,
      from: req.body.from,
      to: req.body.to,
      status:req.body.status
  });
  const notif={
    requestor: req.body.requestor,
    requestee: req.body.requestee,
  }
  newRequest.save().then(post => res.json(post));
  console.log("Sharing Request sucessfully submitted");
});

module.exports = router;
