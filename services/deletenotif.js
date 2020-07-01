const express = require("express");
const router = express.Router();
const Post = require("../models/Notification");

router.route("/delete").post((req, res) => {
  const delReq  = new Post({
    name: req.body.name
});
  Post.findOneAndUpdate({name:delReq.name},{ $pop: { msg: -1 } })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
