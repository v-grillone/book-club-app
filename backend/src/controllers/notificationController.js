import Notification from "../models/Notification.js";

export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({ user: req.user.id, read: false }).sort({ createdAt: -1 });
    res.status(200).json(notifications);    
  } catch (error) {
    console.error("Error fetching notifications", error); 
    res.status(500).json({ message: "Failed to fetch notifications" });   
  }
}

export async function markNotificationRead(req, res) {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notification as read", error);
    res.status(500).json({ message: "Failed to mark notification as read"});
  }
}