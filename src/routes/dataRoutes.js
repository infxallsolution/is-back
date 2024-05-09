import express from 'express'
import controller from '../controllers/dataController.js'
const router = express.Router()


/**
* @swagger
* /api/data/list:
*   get:
*     summary: Obtiene el listado de datas que alimentan el dashboard
*     tags:
*       - Data
*     description: Retorna una lista de todos los data registrados.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de data.
*       500:
*         description: Error interno del servidor.
*/
router.get('/list',controller.listController)


/**
* @swagger
* /api/data/listbyclient/{id}:
*   get:
*     summary: Obtiene el listado de datas que alimentan el dashboard - por cliente
*     tags:
*       - Data
*     description: Retorna lista de data por cliente
*     parameters:
*       - in: path
*         name: id
*         description: ID del cliente
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de un data
*       500:
*         description: Error interno del servidor.
*/
router.get('/listbyclient/:id',controller.listByClientController)





/**
* @swagger
* /api/data/get/{id}:
*   get:
*     summary: Obtiene la informacion de una data especifica
*     tags:
*       - Data
*     description: Retorna los datos de un data
*     parameters:
*       - in: path
*         name: id
*         description: ID del data a buscar
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de un data
*       500:
*         description: Error interno del servidor.
*/
router.get('/get/:id',controller.getController)



/**
* @swagger
* /api/data/insert:
*   post:
*     summary: Crea un nuevo data
*     tags:
*       - Data
*     description: Crea un nuevo data con la información proporcionada.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               clientId:
*                 type: string
*     responses:
*       201:
*         description: cliente creado exitosamente.
*       400:
*         description: Datos de cliente no válidos.
*/
router.post('/insert',controller.insertController)
router.post('/delete',controller.deleteController)
export default router