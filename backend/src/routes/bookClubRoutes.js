import express from 'express';
import multer from "multer";
import { getAllClubs, createClub, updateClub } from '../controllers/bookClubController.js';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get('/', getAllClubs);
router.post('/', upload.single('image'), createClub);
router.put('/:id', updateClub);

export default router;