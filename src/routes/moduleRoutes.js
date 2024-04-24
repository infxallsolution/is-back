import express from 'express'
import controller from '../controllers/moduleController.js'
const router = express.Router()


router.get('/list',controller.listController)
router.get('/get',controller.getController)
router.post('/insert',controller.insertController)
router.post('/delete',controller.deleteController)
export default router