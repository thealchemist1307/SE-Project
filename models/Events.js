const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  eventName : String,
  eventAddr : String,
  status : String
});

module.exports = Events = mongoose.model("events", eventsSchema);
