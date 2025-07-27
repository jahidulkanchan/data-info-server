const express = require('express');
const router = express.Router();
const { loginUser, getAllUser } = require('./user.controller');


router.get('/' , getAllUser)
router.post('/login', loginUser);

module.exports = router;
