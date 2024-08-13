import express from 'express'
import controller from '../controllers/moduleClientController.js'
const router = express.Router()

/**
* @swagger
* /api/moduleclient/list:
*   get:
*     summary: Obtiene todos los modulos
*     tags:
*       - ModuleClient
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
* /api/moduleclient/listbyclient:
*   get:
*     summary: Obtiene todos un modulo de un cliente
*     tags:
*       - ModuleClient
*     description: Retorna los modulos de un cliente.
*     parameters:
*       - in: query
*         name: id
*         description: ID del cliente
*         required: true
*         default: 23fd6d18-927a-470e-8d71-f2959a174d1
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los modulos.
*       500:
*         description: Error interno del servidor.
*/
router.get('/listbyclient',controller.getModulesByClientController)
router.get('/get',controller.getController)




/**
* @swagger
* /api/moduleclient/activeModules:
*   get:
*     summary: Obtiene todos un modulo de un cliente
*     tags:
*       - ModuleClient
*     description: Retorna los modulos de un cliente.
*     parameters:
*       - in: query
*         name: id
*         description: ID del cliente
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los modulos.
*       500:
*         description: Error interno del servidor.
*/
router.get('/activeModules',controller.getModulesActiveByClientController)
router.get('/get',controller.getController)


/**
* @swagger
* /api/moduleclient/insert:
*   post:
*     summary: ingresa un modulo para un cliente
*     tags:
*       - ModuleClient
*     description: ingresa un modulo para un cliente
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               clientId:
*                 type: string
*               moduleId:
*                 type: string
*               state:
*                 type: boolean
*     responses:
*       200:
*         description: Operación exitosa. ingresa un modulo para un cliente.
*       500:
*         description: Error interno del servidor.
*/
router.post('/insert',controller.insertController)


/**
* @swagger
* /api/moduleclient/delete:
*   delete:
*     summary: elimina un modulo asociado a un cliente
*     tags:
*       - ModuleClient
*     description: elimina un modulo asociado a un cliente
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               clientId:
*                 type: string
*               moduleId:
*                 type: string
*               state:
*                 type: boolean
*     responses:
*       200:
*         description: Operación exitosa. elimina un modulo asociado a un cliente
*       500:
*         description: Error interno del servidor.
*/
router.delete('/delete',controller.deleteController)
export default router