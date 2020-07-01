const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.route("/").get((req, res) => {
  Feedback.find({})
    .then(data=> {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ feed: "Error in fetching the feeds" });
    });
});

module.exports = router;
