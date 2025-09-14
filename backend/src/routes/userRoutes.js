import express from "express";
import { authMiddleware } from "../middleware/auth.js"
import { userRegister, userLogin, joinClub } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/sign-up", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/join", authMiddleware, joinClub);



export default userRouter;