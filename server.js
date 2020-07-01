const express = require("express");
const app = express();
var cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const crequest = require("./services/post");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getrequests = require("./services/fetchrequests");
const deleterequests = require("./services/deleterequest");
const sharerequests = require("./services/sharerequests");
const sharing = require("./services/sharing");
const events = require("./services/events");
const adminLogin = require("./services/adminLogin");
const updateshare = require("./services/updateshare");
const updatecounter = require("./services/updatecounter");
const getcounter = require("./services/getcounter");
const updatemember = require("./services/updatemembers");
const getmember = require("./services/getmembers");
const postmember = require("./services/postmembers");
const deleteRide = require("./services/deleteRide");
const sendFeedback = require("./services/sendFeedback");
const getFeedback = require("./services/getFeedback");
const deleteFeedback = require("./services/deleteFeedback");
const deletecarpool = require("./services/deletecarpool");
const expressSession = require("express-session");
const getGroups = require("./services/getGroups");
const getNotif = require("./services/getNotif");
const notifstatus = require("./services/notifstatus");
const deletenotif = require("./services/deletenotif");
const googlecalendar = require("./services/googlecalendar");
const path = require("path");
require("./models/cabRequests");
require("./models/User");
require("./services/passport");

mongoose.set("useFindAndModify", false);
mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected.db");
    }
);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());
app.use(cookieParser("foo"));
app.use(
    expressSession({
        secret: "foo",
        cookie: {
            expires: false,
            secure: true,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/cabs", crequest);
app.use("/api/fetchrequests", getrequests);
app.use("/api/deletemyrequests", deleterequests);
app.use("/api/share", sharerequests);
app.use("/api/sharing", sharing);
app.use("/api/share", updateshare);
app.use("/api/events", events);
app.use("/adminlogin", adminLogin);
app.use("/api/counter", getcounter);
app.use("/api/counter", updatecounter);
app.use("/api/member", getmember);
app.use("/api/member", updatemember);
app.use("/api/member", postmember);
app.use("/api/deleteride", deleteRide);
app.use("/api/deletecarpool", deletecarpool);
app.use("/getgroups", getGroups);
app.use("/feedback", sendFeedback);
app.use("/getfeedback", getFeedback);
app.use("/deletefeedback", deleteFeedback);
app.use("/notif", getNotif);
app.use("/notifstatus", notifstatus);
app.use("/notif", deletenotif);
app.use("/calendar", googlecalendar);
const port = process.env.PORT || 5000;
require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
    });
}
app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
});

app.listen(port, () => {
    console.log(port);
});
