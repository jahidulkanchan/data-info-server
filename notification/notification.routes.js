const express = require('express');
const router = express.Router();
const { getAllNotifications, deleteNotification, markAsRead,  } = require('./notification.controller');

router.get('/', getAllNotifications);
router.delete('/:id', deleteNotification);
router.patch('/read', markAsRead);

module.exports = router;
