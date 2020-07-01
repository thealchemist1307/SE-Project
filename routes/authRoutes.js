const passport = require("passport");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const keys = require("../config/keys");
module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: [
                "profile",
                "email",
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/calendar.events",
            ],
            accessType: "offline",
            prompt: "consent",
        })
    );
    app.get(
        "/auth/google/redirect",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/dashboard");
        }
    );
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
        console.log("current user is ", req.user);
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.post("/calendarcreate", (req, res) => {
        var oauth2Client = new google.auth.OAuth2(
            "522520219902-jrvg774rjfahi4q5e0odio3tlq2nbc7l.apps.googleusercontent.com",
            "KLjGkk2KBPIXA0Jmy8hFfvqc",
            "localhost:5000/dashboard"
            //,config.callbackURL
        );

        const rt = req.user.refreshToken;
        oauth2Client.setCredentials({ refresh_token: rt });

        var event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
                "A chance to hear more about Google's developer products.",
            start: {
                dateTime: "2020-04-22T09:00:00-07:00",
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: "2020-04-22T17:00:00-07:00",
                timeZone: "Asia/Kolkata",
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        };

        var calendar = google.calendar({ version: "v3", auth: oauth2Client });
        calendar.events.insert(
            {
                calendarId: "primary",
                resource: event,
                visibility: "public",
            },
            function (err, event) {
                if (err) {
                    console.log(
                        "There was an error contacting the Calendar service: " +
                            err
                    );
                    return;
                }
                console.log(event);
                console.log("Event created: %s", event.data.htmlLink);
            }
        );
    });
};
