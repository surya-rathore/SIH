const express = require("express");
const imagController = require("../controllers/textToimag");
const router = express.Router();

router.post("/text_image", imagController.text_image);
module.exports = router;