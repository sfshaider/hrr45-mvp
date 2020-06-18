const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: "Name cannot be empty!",
    },
    email: {
      type: String,
      required: "Email cannot be empty!",
    },
    password: {
      type: String,
      required: "Password cannot be empty!",
    },
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model("User", userSchema);