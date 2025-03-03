const express = require('express');
const router = express.Router();
const adminController = require('../server/controller/adminController')
const verifyAdmin = require('../server/middleware/verifyAdmin')


router.post("/login", adminController.login)
router.get('/home', verifyAdmin, adminController.home);
router.post('/deleteUser', verifyAdmin, adminController.deleteUser)
router.get('/logout', verifyAdmin, adminController.adminLogot);

module.exports = router;    