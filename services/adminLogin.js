const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.route("/").post((req, res) => {
  const form = {
    email: req.body.email,
    password: req.body.password
  };
  Admin.findOne({ email: form.email })
    .then(admin => {
      if (admin) {
        if (form.password === admin.password) {
          console.log("Success");
          res.status(200).end();
        } else {
          console.log("Wrong Password");
          res.status(400).json({password: 'Wrong Password'});
        }
      } else {
        console.log("User not found");
        res.status(404).json({user: 'User not found'});
      }
    })
    .catch(err => {
      res.status(400).json(err).end();
    });
});

module.exports = router;
