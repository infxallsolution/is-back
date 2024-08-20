import express from 'express'
import controller from '../controllers/redirectionController.js'
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router()

/**
* @swagger
* /api/redirection/redirecttomodule/{module}:
*   get:
*     summary: regresa la url del módulo con su respectivo token
*     tags:
*       - Redirect
*     description: regresa la url del módulo con su respectivo token
*     parameters:
*       - in: path
*         name: module
*         description: Modulo
*         required: true
*         default: Administracion
*         schema:
*           type: string
*       - in: path
*         name: company
*         description: Empresa
*         required: true
*         default: 1
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. regresa la url del módulo con su respectivo token
*       500:
*         description: Error interno del servidor.
*/

router.get('/redirecttomodule/:module',verifyToken,controller.redirectToModuleController)





/**
* @swagger
* /api/redirection/redirecttodashboard:
*   get:
*     summary: regresa la url del módulo con su respectivo token
*     tags:
*       - Redirect
*     description: regresa la url del módulo con su respectivo token
*     responses:
*       200:
*         description: Operación exitosa. regresa la url del módulo con su respectivo token
*       500:
*         description: Error interno del servidor.
*/

router.get('/redirecttodashboard',verifyToken,controller.redirectToDashboardController)




export default router