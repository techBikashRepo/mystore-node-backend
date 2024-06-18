const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.insertUser = async function (username, password) {
  const user = new this({ username, password });
  return user.save();
};

userSchema.statics.fetchUserByUsername = async function (username) {
  return this.findOne({ username });
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
