import express from 'express'
import controller from '../controllers/clientController.js'
const router = express.Router()


router.get('/list',controller.listClientsController)
router.get('/getclient',controller.getClientController)
router.get('/getclientbynit',controller.getClientByNitController)
router.post('/insert',controller.insertClientController)
router.post('/update',controller.updateClientController)
router.post('/updatebynit',controller.updateClientByNitController)
router.post('/delete',controller.deleteClientController)
export default router