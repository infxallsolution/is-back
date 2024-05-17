import express from 'express'
import controller from '../controllers/dataDetailController.js'
const router = express.Router()

/**
* @swagger
* /api/dashboard/list/{id}:
*   get:
*     summary: Obtiene el datadetail de un data especifico, mediante el dataId
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
*     summary: Obtiene el listado completo de los data y sus respectivos datadetails, mediante el clientId
*     tags:
*       - dashboard
*     description: Retorna el listado completo de los data y sus respectivos datadetails
*     parameters:
*       - in: path
*         name: id
*         description: ID del cliente
*         required: true
*         default: 23fd6d18-927a-470e-8d71-f2959a174d1
*         schema:
*           type: string
*       - in: query
*         name: option
*         description: DAY, MOUNTH, YEAR
*         required: true
*         schema:
*           type: string
*           enum: [DAY, MONTH, YEAR]
*     responses:
*       200:
*         description: Operación exitosa. Devuelve el listado completo de los data y sus respectivos datadetails
*       500:
*         description: Error interno del servidor.
*/
router.get('/listbyclient/:id',controller.listByClient)









export default router