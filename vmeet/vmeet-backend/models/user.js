const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  friends: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"}]
});
// friends is an array of object ids of users which are our friends

module.exports = mongoose.model("User", userSchema);
