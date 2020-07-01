const express = require('express');
const router = express.Router();
const Post = require('../models/Counter');

router.route('/').get((req, res) => {
    Post.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;
