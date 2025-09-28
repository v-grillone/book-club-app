import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  settings: {
    darkMode: { type: Boolean, default: false},
    notifications: { type: Boolean, default: true },
  },
  joinedClubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookClub"
    }
  ],
  tokenVersion: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema );

export default User;