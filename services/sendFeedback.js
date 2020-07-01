const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.route("/").post((req, res) => {
  const newFeed = new Feedback({
    name: req.body.namefield,
    email: req.body.emailfield,
    message: req.body.messagefield
  });

  newFeed
    .save()
    .then(response => {
      res.status(200).json(response);
      console.log("Feedback sent successfully to developers.");
    })
    .catch(err => {
      res.status(400).json({ feed: "Feedback could not be saved" });
    });
});

module.exports = router;
