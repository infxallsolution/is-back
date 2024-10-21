import express from 'express'
import controller from '../controllers/recordController.js'
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router()

/**
* @swagger
* /api/record/list:
*   get:
*     summary: Obtiene todos los record
*     tags:
*       - Record
*     description: Retorna una lista de todos los record registrados.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de record.
*       500:
*         description: Error interno del servidor.
*/

router.get('/list',controller.listController)

/**
* @swagger
* /api/module/get:
*   get:
*     summary: Obtiene record por id
*     tags:
*       - Record
*     description: Retorna un record.
*     parameters:
*       - in: query
*         name: id
*         description: ID del record
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un record.
*       500:
*         description: Error interno del servidor.
*/
router.get('/get',controller.getController)

/**
* @swagger
* /api/record/insert:
*   post:
*     summary: ingresa un record
*     tags:
*       - Record
*     description: Retorna un record.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               documentId:
*                 type: string
*                 default: f71912ea-0586-4724-b4db-03b8352fee8a
*               clientId:
*                 type: string
*                 default: 23fd6d18-927a-470e-8d71-f2959a174d2
*               moduleId:
*                 type: string
*                 default: 1
*               notes:
*                 type: string
*                 default: notas por defecto
*               state:
*                 type: boolean
*     responses:
*       200:
*         description: Operación exitosa. ingresa un record.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)


   
export default router