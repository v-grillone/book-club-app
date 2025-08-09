import mongoose from "mongoose";

const bookClubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  members: {type: Number, required: true },
  speed: { type: Number, required: true},
  createdAt: { type: Date, default: Date.now },
});

const BookClub = mongoose.model("BookClub", bookClubSchema);

export default BookClub;