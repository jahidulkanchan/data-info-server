// notification.model.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    email: String,
    title: String,
    message: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Notification', notificationSchema);
