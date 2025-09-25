import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: "BookClub", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

});

const Post = mongoose.model('Post', postSchema);
export default Post;