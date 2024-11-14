var express = require('express');
var router = express.Router();
const userController = require("../server/controller/userController")
const upload = require('../multer/multer')

router.post("/signup", upload.single('image'), userController.signup)
router.post("/login", userController.login)
router.get('/home',userController.home)
router.post('/editUser',upload.single('image'),userController.userEdit)



module.exports = router;
