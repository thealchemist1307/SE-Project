const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  name: {
    type: String
  },
  
  msg: [
    {
        type: String
    }
   ]
});

mongoose.model("notification", notificationSchema);

module.exports = CabGroup = mongoose.model("notification", notificationSchema);
