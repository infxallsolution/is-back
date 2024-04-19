import express from 'express'
import controller from '../controllers/clientController.js'
const router = express.Router()
router.get('/list',controller.listClients)
router.get('/get',controller.getClient)
router.post('/insert',controller.insertClient)
router.post('/update',controller.updateClient)
router.post('/delete',controller.deleteClient)
export default router