const Chatroom = require("../models/room.js");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) {
    res.status(404).end("Chatroom already exists!")
  } else {
    const chatroom = new Chatroom({
      name,
    });
  
    await chatroom.save();
  
    res.json({
      message: "Chatroom created!",
    });
  }
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};