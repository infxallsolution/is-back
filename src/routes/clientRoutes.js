import express from 'express'
import controller from '../controllers/clientController.js'
const router = express.Router()

/**
* @swagger
* /api/client/list:
*   get:
*     summary: Obtiene todos los clientes
*     tags:
*       - Usuarios
*     description: Retorna una lista de todos los clientes registrados.
*     responses:
*       200:
*         description: Operación exitosa. Devuelve una lista de clientes.
*       500:
*         description: Error interno del servidor.
*/
router.get('/list',controller.listClientsController)


/**
* @swagger
* /api/client/get:
*   get:
*     summary: Obtiene los datos de un cliente
*     tags:
*       - Usuarios
*     description: Retorna los datos de un cliente
*     parameters:
*       - in: query
*         name: id
*         description: ID del cliente a buscar
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de un cliente
*       500:
*         description: Error interno del servidor.
*/
router.get('/get',controller.getClientController)



/**
* @swagger
* /api/client/insert:
*   post:
*     summary: Crea un nuevo cliente
*     tags:
*       - Usuarios
*     description: Crea un nuevo cliente con la información proporcionada.
*     parameters:
*       - in: body
*         name: body
*         description: Datos del nuevo cliente
*         required: true
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             identification:
*               type: string
*             contact:
*               type: string
*             email:
*               type: string
*             address:
*               type: string
*             type:
*               type: string
*     responses:
*       201:
*         description: cliente creado exitosamente.
*       400:
*         description: Datos de cliente no válidos.
*/
router.post('/insert',controller.insertClientController)

/**
* @swagger
* /api/client/update:
*   post:
*     summary: Actualiza los datos del cliente
*     tags:
*       - Usuarios
*     description: Actualiza un cliente con información proporcionada.
*     parameters:
*       - in: query
*         name: id
*         description: ID del cliente
*         required: true
*         schema:
*           type: string
*       - in: body
*         name: body
*         description: Datos del nuevo cliente
*         required: true
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             identification:
*               type: string
*             contact:
*               type: string
*             email:
*               type: string
*             address:
*               type: string
*             type:
*               type: string
*     responses:
*       201:
*         description: cliente actualizado exitosamente.
*       400:
*         description: Datos de cliente no válidos.
 */
router.post('/update',controller.updateClientController)
router.post('/delete',controller.deleteClientController)
export default router