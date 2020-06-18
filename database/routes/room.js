const router = require("express").Router();
const room = require("../controllers/room.js");
// const login = require("../../authentication/login.js");

// router.post("/", login, room.createChatroom);
// router.get("/", login, room.getAllChatrooms);

router.post("/", room.createChatroom);
router.get("/", room.getAllChatrooms);

module.exports = router;