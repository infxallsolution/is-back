import express from 'express'
import controller from '../controllers/dashboardController.js'
const router = express.Router()


router.get('/list',controller.listDashboardsController)
router.get('/get',controller.getDashboardController)
router.post('/insert',controller.insertDashboardController)
router.post('/update',controller.updateDashboardController)
router.post('/delete',controller.deleteDashboardController)
export default router