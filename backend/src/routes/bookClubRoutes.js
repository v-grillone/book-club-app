import express from 'express';
import multer from "multer";
import { getAllClubs, createClub, updateClub, getBookClub, searchClub } from '../controllers/bookClubController.js';
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get('/', authMiddleware, getAllClubs);
router.get('/search', authMiddleware, searchClub);
router.get('/:id', authMiddleware, getBookClub);
router.post('/', upload.single('image'), createClub);
router.put('/:id', updateClub);

export default router;