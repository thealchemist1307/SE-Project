const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sharingSchema = new Schema({
  id:{
      type:Number,unique:true
  },
  requestor: {
    type: String
  },
  requestee: {
    type: String
  },
  email:{
    type:String
  },
  msg: {
    type: String
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
  },
  status:{
    type: String
  }
}, { versionKey: false });

module.exports = Post = mongoose.model("sharingRequests", sharingSchema);
