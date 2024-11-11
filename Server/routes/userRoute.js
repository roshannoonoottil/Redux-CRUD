var express = require('express');
var router = express.Router();
const userController = require("../server/controller/userController")

router.post("/signup", userController.signup)



module.exports = router;
