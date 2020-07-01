const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.route("/").post((req, res) => {
  const request = new Feedback({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  Feedback.findOneAndDelete(
    {
      name: request.name,
      email: request.email,
      message: request.message
    },
    err => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        console.log("Succesfully deleted");
      }
    }
  );
});

module.exports = router;
