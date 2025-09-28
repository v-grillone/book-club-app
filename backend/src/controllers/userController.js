import User from "../models/User.js";
import BookClub from "../models/BookClub.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// User Register
export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists."});

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save()
    
    res.status(201).json({ message: "New user created successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });    
  }
}

// User Login
export async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found."});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password not found."});
    
    const token = jwt.sign({ id: user._id, tokenVersion: user.tokenVersion }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error at userLogin controller:", error);
    res.status(500).json({ message: "Error logging in." });    
  }
}

// User join club
export async function joinClub(req, res) {
  try {
    const userId = req.user.id; // comes from authMiddleware
    const { clubId } = req.body;

    const club = await BookClub.findById(clubId)
    if(!club) return res.status(404).json({message: "No book club found"});

    const user = await User.findById(userId); 
    if(user.joinedClubs.includes(clubId)) {
      return res.status(400).json({message: "Already joined this club."})
    }

    user.joinedClubs.push(clubId);
    await user.save();
    club.members.push(userId);
    await club.save();    

    res.status(200).json({message: "Joined club successfully", user});
    
  } catch (error) {
    console.error("Error joining club:", error);
    res.status(500).json({message: "Server error joining club"});
  }
}


// User get settings
export async function getSettings(req, res) {
  try {
    const user = await User.findById(req.user.id);

    if(!user) return res.status(404).json({ message: "User not found" });

    const userSettings = {
      username: user.username,
      darkMode: user.settings?.darkMode || false,
      notifications: user.settings?.notifications ?? true
    }
    res.status(200).json(userSettings);    
  } catch (error) {
    console.error("Error getting user settings.", error);
    res.status(500).json({ message: "Error getting user settings"});
  }
}


// User update settings

export async function updateSettings(req, res) {
  try {
    const { darkMode, notifications, username } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id);
    if(!user) return res.status(404).json({ message: "User not found" });
    
    if(username) user.username = username;
    if(darkMode !== undefined) user.settings.darkMode = darkMode;
    if(notifications !== undefined) user.settings.notifications = notifications;
    
    await user.save();
    res.status(200).json({ message: "Settings updated", user })
  } catch (error) {
    console.error("Error updating settings", error);
    res.status(500).json({ message: "Error updating settings"});
    
  }
}


// Current user info
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user", error);
    res.status(500).json({ message: "Error fetching current user" });
  }
}


// Change user password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isMatch) return res.status(400).json({ message: "Incorrect current password"});

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed
    await user.save();

    res.status(200).json({ message: "Password changed successfully"});    
  } catch (error) {
    console.error("Error changing password", error);
    res.status(500).json({ message: "Error changing password"});    
  }
}

// Logout user from all devices
export async function logoutAll(req, res) {
  try {
    await User.findByIdAndUpdate(req.user.id, { $inc: { tokenVersion: 1 }});
    res.status(200).json({ message: "Logged out from all devices"});    
  } catch (error) {
    console.error("Error logging out from all devices", error);
    res.status(500).json({ message: "Error logging out from all devices"});    
  }
}