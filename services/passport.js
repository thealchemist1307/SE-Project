const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const fs = require("fs");
const Notif = require("../models/Notification");
const Requests= require("../models/cabRequests")
const express = require("express");
const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(refreshToken);
      User.findOne({ googleId: profile.id }).then(userExists => {
        if (userExists) { 
          
          done(null, userExists);
        } else {
          console.log(profile.emails[0].value);
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            refreshToken : refreshToken
          })
            .save()
            .then(newUser => {
              console.log("new user created" + newUser);
              done(null, newUser);
            });
            const newNotif=new Notif({
              name:  profile.displayName,
              msg: "Welcome to BPHC Unite",
              });
            newNotif.save().then(post => res.json(post));    
        }
      });
    }
  )
);
