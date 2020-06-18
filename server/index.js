const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const jwt = require("jwt-then");
const secret = require("../database/secret.js")
const MessageModel = require('../database/models/message');

const port = 1234




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", require("../database/routes/user"));
app.use("/chatroom", require("../database/routes/room"));
app.use(express.static(`${__dirname}/../public`));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../public/index.html`))
});

mongoose.connect(
    'mongodb://localhost/mvp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to MongoDB on ${db.host}:${db.port}`));

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const socket = require("socket.io")(server);

// socket.use(async (socket, next) => {
//   try {
//     const token = socket.handshake.query.token;
//     const payload = await jwt.verify(token, secret);
//     socket.userId = payload.id;
//     next();
//   } catch (err) {}
// });

socket.on("connection", (socket) => {
    console.log("Connected:==>>> ", socket.handshake.query.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected: ", socket.handshake.query.userId);
    });

    socket.on('joinRoom', async ({ chatroomId }, cb) => {
        const existingMessages = await MessageModel.find({ chatroom: chatroomId }).populate('user');
        cb(existingMessages)
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        const newMessage = await (await MessageModel.create({ chatroom: chatroomId, message, user: socket.handshake.query.userId })).populate('user').execPopulate();
        socket.broadcast.emit('newMsg', newMessage)
    });
});
