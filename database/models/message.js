const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom cannot be empty",
    ref: "Chatroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Username cannot be empty",
    ref: "User",
  },
  message: {
    type: String,
    required: "Message cannot be empty!",
  },
});

module.exports = mongoose.model("Message", messageSchema);