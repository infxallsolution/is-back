import express from 'express'
import controller from '../controllers/moduleController.js'
const router = express.Router()

/**
* @swagger
* /api/module/list:
*   get:
*     summary: Obtiene todos los modulos
*     tags:
*       - Module
*     description: Retorna una lista de todos los modulos registrados.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de modulos.
*       500:
*         description: Error interno del servidor.
*/

router.get('/list',controller.listController)

/**
* @swagger
* /api/module/get:
*   get:
*     summary: Obtiene todos un modulo por id
*     tags:
*       - Module
*     description: Retorna un modulo.
*     parameters:
*       - in: query
*         name: id
*         description: ID del modulo
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un modulo.
*       500:
*         description: Error interno del servidor.
*/
router.get('/get',controller.getController)

/**
* @swagger
* /api/module/insert:
*   post:
*     summary: Obtiene todos un modulo por id
*     tags:
*       - Module
*     description: Retorna un modulo.
*     parameters:
*       - in: query
*         name: id
*         description: ID del modulo
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un modulo.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)
router.post('/delete',controller.deleteController)
export default router