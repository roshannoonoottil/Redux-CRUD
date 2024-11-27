const express = require('express');
const router = express.Router();
const userController = require("../server/controller/userController")
const upload = require('../multer/multer')
const verifyUser = require('../server/middleware/verifyUser')

router.post("/signup", upload.single('image'), userController.signup)
router.post("/login", userController.login)
router.get('/home', verifyUser, userController.home)
router.post('/editUser', verifyUser, upload.single('image'), userController.userEdit)



module.exports = router;
