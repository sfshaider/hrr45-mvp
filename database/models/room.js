const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
});

module.exports = mongoose.model("Chatroom", roomSchema);