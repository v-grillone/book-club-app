import mongoose from "mongoose";

const bookClubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  speed: { type: Number, required: true},
  startDate: { type: Date, required: true},
  coverImageURL: { type: String },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const BookClub = mongoose.model("BookClub", bookClubSchema);

export default BookClub;