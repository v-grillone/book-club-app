import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createPost, getClubPosts, replyToPost, likePost, dislikePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/:id' , authMiddleware, createPost);
postRouter.get('/:id', authMiddleware, getClubPosts);
postRouter.post('/:id/reply', authMiddleware, replyToPost);
postRouter.patch('/:id/like', authMiddleware, likePost);
postRouter.patch('/:id/dislike', authMiddleware, dislikePost);

export default postRouter