import express from 'express'
import controller from '../controllers/clientController.js'
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router()

/**
* @swagger
* /api/client/list:
*   get:
*     summary: Obtiene todos los clientes
*     tags:
*       - Clientes
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
* /api/client/get/{id}:
*   get:
*     summary: Obtiene los datos de un cliente
*     tags:
*       - Clientes
*     description: Retorna los datos de un cliente
*     parameters:
*       - in: path
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
router.get('/get/:id',controller.getClientController)



/**
* @swagger
* /api/client/insert:
*   post:
*     summary: Crea un nuevo cliente
*     tags:
*       - Clientes
*     description: Crea un nuevo cliente con la información proporcionada.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               identification:
*                 type: string
*               contact:
*                 type: string
*               email:
*                 type: string
*               address:
*                 type: string
*               type:
*                 type: string
*               state:
*                 type: boolean
*               company:
*                 type: integer
*     responses:
*       201:
*         description: cliente creado exitosamente.
*       400:
*         description: Datos de cliente no válidos.
*/
router.post('/insert',controller.insertClientController)

/**
* @swagger
* /api/client/update/{id}:
*   post:
*     summary: Actualiza los datos del cliente
*     tags:
*       - Clientes
*     description: Actualiza un cliente con información proporcionada.
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               identification:
*                 type: string
*               contact:
*                 type: string
*               email:
*                 type: string
*               address:
*                 type: string
*               type:
*                 type: string
*               state:
*                 type: boolean
*               company:
*                 type: integer
*     parameters:
*       - in: path
*         name: id
*         description: ID del cliente
*         required: true
*         schema:
*           type: string
*     responses:
*       201:
*         description: cliente actualizado exitosamente.
*       400:
*         description: Datos de cliente no válidos.
 */
router.post('/update/:id',controller.updateClientController)
router.post('/delete',controller.deleteClientController)
export default router