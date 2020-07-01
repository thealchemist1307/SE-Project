const express = require("express");
const router = express.Router();
const {google} = require("googleapis");
const keys = require("../config/dev");
router.route("/add").post((req,res)=>{
    const information = {
        dateTime : req.body.dateTime,
        refreshToken : req.body.refreshToken
        
    }
    console.log(information)
    console.log("here" +information.dateTime);
    const OAuth2Client = new google.auth.OAuth2(keys.googleClientId,keys.googleClientSecret,"/dashboard");
    OAuth2Client.setCredentials({refresh_token : information.refreshToken});
    var event = {
        'summary': 'Cab Ride',
        'location': 'XYZ PLACE',
        'description': 'Shared Cab ride from BPHC Unite',
        'start': {
          'dateTime': information.dateTime,
          'timeZone': 'Asia/Kolkata',
        },
        'end': {
          'dateTime': information.dateTime,
          'timeZone': 'Asia/Kolkata',
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
          ],
        },
      };
      var calendar = google.calendar({version : 'v3', auth: OAuth2Client});
      calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        visibility : "public"
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        console.log(event);
        console.log('Event created: %s', event.data.htmlLink);
    });
})

module.exports = router;