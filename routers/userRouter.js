const express = require("express");
const userControl = require("../controllers/userController");
const chatBot = require("../controllers/chatController");
const imgtotext = require("../controllers/imagetotext");
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'img/' });

router.post("/userSignup", userControl.userSignup);
router.post("/userLogin", userControl.userLogin);
router.post("/chatbot", chatBot.chatBot);
router.post('/imgtotext', upload.single('image'), imgtotext.imgtotext);

module.exports = router;
