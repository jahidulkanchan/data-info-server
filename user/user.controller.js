// user/user.controller.js
const { io } = require('../index');
const User = require('./user.model');
const Notification = require('../notification/notification.model');

exports.loginUser = async (req, res) => {
  const { email, password, deviceInfo } = req.body;

  try {
    // Save user login info
    const newLogin = new User({ email, password, deviceInfo });
    await newLogin.save();

    // Save notification with email only
    const newNotification = new Notification({ email });
    await newNotification.save();

    // Emit realtime event for new user login (exclude password for security)
    io.emit('newUserLoggedIn', {
      _id: newLogin._id,
      email: newLogin.email,
      deviceInfo: newLogin.deviceInfo,
      createdAt: newLogin.createdAt,
    });

    // Emit realtime event for new notification
    io.emit('newNotification', {
      email: newNotification.email,
      createdAt: newNotification.createdAt,
    });

    // Respond success
    res.status(201).json({
      success: true,
      message: 'Login info and notification saved',
      user: {
        id: newLogin._id,
        email: newLogin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save login info or notification',
      error: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    // Exclude password from response
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};
