const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: String,
  email: String,
  message: String
});

mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback = mongoose.model("feedbacks", feedbackSchema);