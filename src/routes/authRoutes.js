// routes/authRoutes.js
import express from 'express';
import { loginController, insertUserController } from '../controllers/authController.js';
const router = express.Router();


/**
* @swagger
* /api/auth/login:
*   post:
*     summary: Iniciar sesión de usuario
*     tags:
*       - Auth
*     security: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*               identification:
*                 type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un token.
*       500:
*         description: Error interno del servidor.
*/
router.post('/login', loginController);

/**
* @swagger
* /api/auth/insert:
*   post:
*     summary: crea un nuevo usuario
*     tags:
*       - Auth
*     security: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*               identification:
*                 type: string
*     responses:
*       200:
*         description: Operación exitosa. usuario creado.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert', insertUserController);

export default router;
