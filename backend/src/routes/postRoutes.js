import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createPost, getClubPosts } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/:id' , authMiddleware, createPost);
postRouter.get('/:id', authMiddleware, getClubPosts);

export default postRouter