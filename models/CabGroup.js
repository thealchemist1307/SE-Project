const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  from: {
    type: String
  },
  to: {
    type: String
  }
});

mongoose.model("cabgroups", groupSchema);

module.exports = CabGroup = mongoose.model("cabgroups", groupSchema);
