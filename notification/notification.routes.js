const express = require('express');
const router = express.Router();
const { getAllNotifications } = require('./notification.controller');

router.get('/', getAllNotifications);

module.exports = router;
