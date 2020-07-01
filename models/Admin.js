const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: String,
  password: String
});

mongoose.model("admins", adminSchema);

module.exports = Admin = mongoose.model("admins", adminSchema);
