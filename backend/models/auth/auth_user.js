const mongoose = require("mongoose");

const authuser_schema = mongoose.Schema({
  username: { type: String },
  platformId: { type: String },
  email: {
    type: String,
  },
  avatar: String,
  interest: [String],
  provider: String,
});

const User = mongoose.model("auth-user", authuser_schema);

module.exports = User;
