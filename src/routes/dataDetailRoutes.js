import express from 'express'
import controller from '../controllers/dataDetailController.js'
const router = express.Router()

/**
* @swagger
* /api/dashboard/list/{id}:
*   get:
*     summary: Obtiene el listado de datas que alimentan el dashboard - por cliente
*     tags:
*       - dashboard
*     description: Retorna lista de data por cliente
*     parameters:
*       - in: path
*         name: id
*         description: ID de la data
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de un data
*       500:
*         description: Error interno del servidor.
*/
router.get('/list/:id',controller.listController)


/**
* @swagger
* /api/dashboard/listbyclient/{id}:
*   get:
*     summary: Obtiene el listado de datadetails - por cliente
*     tags:
*       - dashboard
*     description: Retorna lista de datadetails por cliente
*     parameters:
*       - in: path
*         name: id
*         description: ID de la data
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de un data
*       500:
*         description: Error interno del servidor.
*/
router.get('/listbyclient/:id',controller.listByClient)



export default router