import express from 'express';
import { getAllClubs, createClub } from '../controllers/bookClubController.js';

const router = express.Router();

router.get('/', getAllClubs);
router.post('/', createClub);

export default router;