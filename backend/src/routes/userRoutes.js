import express from "express";
import { authMiddleware } from "../middleware/auth.js"
import { userRegister, userLogin, joinClub, getSettings, updateSettings, getCurrentUser, changePassword, logoutAll } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/sign-up", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/join", authMiddleware, joinClub);
userRouter.get('/settings', authMiddleware, getSettings);
userRouter.patch('/settings', authMiddleware, updateSettings);
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.patch('/change-password', authMiddleware, changePassword);
userRouter.post('/logout-all', authMiddleware, logoutAll);



export default userRouter;