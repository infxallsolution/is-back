import express from 'express'
import clientRoutes from '../routes/clientRoutes.js'
import authRoutes from '../routes/authRoutes.js';
import dataDetailRoutes from '../routes/dataDetailRoutes.js';
import dataRoutes from '../routes/dataRoutes.js';
import moduleRoutes from '../routes/moduleRoutes.js';
import moduleClientRoutes from '../routes/moduleClientRoutes.js';


const router = express.Router()

router.use('/api/client',clientRoutes)
router.use('/api/auth', authRoutes);
router.use('/api/data', dataRoutes);
router.use('/api/dashboard', dataDetailRoutes);
router.use('/api/module', moduleRoutes);
router.use('/api/moduleclient', moduleClientRoutes);

export default router

