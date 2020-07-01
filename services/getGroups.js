const express = require("express");
const router = express.Router();
const Group = require("../models/CabGroup");

router.route("/").get((req, res) => {
  Group.find({})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ feed: "Error in fetching the groups" });
    });
});

module.exports = router;
