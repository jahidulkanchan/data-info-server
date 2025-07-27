const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    deviceInfo: {
      userAgent: String,
      platform: String,
      language: String,
      browser: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
