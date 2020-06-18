const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Room name cannot be empty!",
  },
});

module.exports = mongoose.model("Chatroom", roomSchema);