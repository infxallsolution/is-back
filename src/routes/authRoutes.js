// routes/authRoutes.js
import express from 'express';
import { loginController, insertUserController } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', loginController);
router.post('/insert', insertUserController);

export default router;
