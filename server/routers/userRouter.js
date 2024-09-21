const express = require("express");
const userControl = require("../controllers/userController");
const router = express.Router();

router.post("/userSignup", userControl.userSignup);
router.post("/userLogin", userControl.userLogin);



module.exports = router;
