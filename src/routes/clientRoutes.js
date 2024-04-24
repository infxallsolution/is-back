import express from 'express'
import controller from '../controllers/clientController.js'
const router = express.Router()


router.get('/list',controller.listClientsController)
router.get('/get',controller.getClientController)
router.post('/insert',controller.insertClientController)
router.post('/update',controller.updateClientController)
router.post('/delete',controller.deleteClientController)
export default router