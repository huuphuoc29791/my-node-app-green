const express = require('express');
const router = express.Router();

const cookieController = require('../controllers/cookieController');

router.get('/login', cookieController.showLogin);
router.post('/login', cookieController.login);

router.get('/home', cookieController.home);
router.get('/logout', cookieController.logout);

module.exports = router;
