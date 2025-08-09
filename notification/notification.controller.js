const Notification = require('./notification.model');

// Get all notifications, sorted by newest first
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
};
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.query; // query থেকে id নেবো

    if (!id) {
      return res.status(400).json({ message: 'Notification id is required' });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({
      message: 'Notification marked as read',
      notification: updatedNotification,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to mark as read',
      error: error.message,
    });
  }
};



