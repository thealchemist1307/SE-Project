const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  msg: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
