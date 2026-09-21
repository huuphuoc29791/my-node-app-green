const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');

router.get('/login', sessionController.showLogin);
router.post('/login', sessionController.login);

router.get('/home', sessionController.home);
router.get('/logout', sessionController.logout);

module.exports = router;
