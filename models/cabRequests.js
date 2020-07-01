const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const requestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  msg: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String
  },
  from: {
    type: String
  },
  to: {
    type: String
  }
});

module.exports = Post = mongoose.model("cabRequest", requestSchema);
