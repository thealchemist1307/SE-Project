const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/CarPool");
const passport = require("passport");

router.route("/").post((req, res) => {
    const request = {
        id: req.body.id,
    };
    console.log(request);
    Post.findOneAndDelete({ id: request.id }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Succesfully deleted");
        }
    });
});

module.exports = router;
