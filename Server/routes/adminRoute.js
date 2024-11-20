const express = require('express');
const router = express.Router();
const adminController = require('../server/controller/adminController')


router.post("/login", adminController.login)
router.get('/home', adminController.adminVerification, adminController.home);
router.post('/deleteUser', adminController.deleteUser)
router.get('/logout', adminController.adminLogot);

module.exports = router;