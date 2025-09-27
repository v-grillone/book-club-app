import express from "express";
import { getNotifications, markNotificationRead } from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/auth.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authMiddleware, getNotifications);
notificationRouter.patch("/mark-read", authMiddleware, markNotificationRead);



export default notificationRouter;