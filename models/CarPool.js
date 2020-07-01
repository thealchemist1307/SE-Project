const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carPoolSchema = new Schema(
  {
    id: {
      type: Number
    },
    members: {
      type: Array
    },
    groupname:{
      type : String
    },
    email:{
      type: Array
    },
    
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
  },
  { versionKey: false }
);

module.exports = CarPool = mongoose.model("CarPool", carPoolSchema);
