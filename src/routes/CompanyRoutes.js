import express from 'express'
import controller from '../controllers/companyController.js'
const router = express.Router()


/**
* @swagger
* /api/company/list:
*   get:
*     summary: Retorna el listado de compañias
*     tags:
*       - Company
*     description: Retorna el listado de compañias.
*     responses:
*       200:
*         description: Operación exitosa. Retorna el listado de compañias.
*       500:
*         description: Error interno del servidor.
*/
router.get('/list',controller.listController)


/**
* @swagger
* /api/company/listbyclient/{id}:
*   get:
*     summary: Retorna el listado de compañias - por cliente
*     tags:
*       - Company
*     description: Retorna el listado de compañias por cliente
*     parameters:
*       - in: path
*         name: id
*         description: ID del cliente
*         required: true
*         default: 23fd6d18-927a-470e-8d71-f2959a174d1
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Retorna el listado de compañias por cliente
*       500:
*         description: Error interno del servidor.
*/
router.get('/listbyclient/:id',controller.listByClientController)





/**
* @swagger
* /api/company/get/{id}:
*   get:
*     summary: Obtiene la informacion de una empresa especifica
*     tags:
*       - Company
*     description: Retorna los datos de un empresa
*     parameters:
*       - in: path
*         name: id
*         description: ID del empresa a buscar
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Operación exitosa. Devuelve los datos de una empresa
*       500:
*         description: Error interno del servidor.
*/
router.get('/get/:id',controller.getController)



/**
* @swagger
* /api/company/insert:
*   post:
*     summary: Crea un nuevo empresa
*     tags:
*       - Company
*     description: Crea un nuevo empresa con la información proporcionada.
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