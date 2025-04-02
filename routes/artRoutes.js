import { Router } from 'express';
import { getAllArt, likeArt } from '../controllers/artController';
import authMiddleware from '../middlewares/authMiddleware';
const router = Router();

router.get('/', getAllArt);
router.post('/like/:artId', authMiddleware, likeArt);

export default router;
