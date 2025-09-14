import User from "../models/User.js";
import BookClub from "../models/BookClub.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

export async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found."});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password not found."});
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error at userLogin controller:", error);
    res.status(500).json({ message: "Error logging in." });    
  }
}

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