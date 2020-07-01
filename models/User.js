const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String,
    avatar: String,
    email: String,
    refreshToken: String,
});

mongoose.model("users", userSchema);

module.exports = User = mongoose.model("users", userSchema);
