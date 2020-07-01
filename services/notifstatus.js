const express = require("express");
const router = express.Router();
const Notif = require("../models/Notification");

router.route("/").post((req, res) => {
    const nstatus={
        sender:req.body.member2,
        reciever:req.body.member1,
        status:req.body.status

    }
    console.log(nstatus)
    if(nstatus.status==="rejected")
    {
    Notif.findOneAndUpdate(
        { name: nstatus.reciever },
        { $push: { msg:nstatus.sender+" has rejected your request"  } },
        { upsert: true },function(err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("Succesfully Updated Notif.");
          }
      );
    }
    else if(nstatus.status==="sent"){
        Notif.findOneAndUpdate(
            { name: nstatus.reciever },
            { $push: { msg:nstatus.sender+" has sent you a request"  } },
            { upsert: true },function(err, doc) {
                if (err) return res.send(500, { error: err });
                return res.send("Succesfully Updated Notif.");
              }
          );
    }
    else{
        Notif.findOneAndUpdate(
            { name: nstatus.reciever },
            { $push: { msg:nstatus.sender+" has accepted your request"  } },
            { upsert: true },function(err, doc) {
                if (err) return res.send(500, { error: err });
                return res.send("Succesfully Updated Notif.");
              }
          );
    }
});

module.exports = router;
