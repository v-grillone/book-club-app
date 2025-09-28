import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.status(400).json({ message: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if(!user) return res.status(401).json({ message: "User not found."});

    if (user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({ message: "Token expired. please log in again"});
    }

    req.user = decoded;
    next();     
  } catch (error) {
    console.error("Auth error", error);
    res.status(401).json({ message: "Invalid Token" });    
  }
} 