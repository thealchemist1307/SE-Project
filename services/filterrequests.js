const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/cabRequests');
const passport = require("passport");

router.route('/').get((req, res) => {
    const request = new Post({
        to: req.body.to,
        from: req.body.from
    });
    console.log("filter request"+request)
    Post.find({from:request.from})
        .then((data) => {
            res.json(data);
            console.log("Data"+data)
        })
        .catch((err) => {
            console.log("Error"+err);
        })
})

module.exports = router;
