const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    Field: {
        type: String
    },
    Counter: {
        type: Number
    },
}, { versionKey: false });

module.exports = Post = mongoose.model("counter", counterSchema);
