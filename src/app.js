import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectDb from './config/db.js'
import swaggerUi from "swagger-ui-express";
import swaggerConfig  from './config/swaggerConfig.js';
import clientRoutes from './routes/clientRoutes.js'
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import dataDetailRoutes from './routes/dataDetailRoutes.js';
import dataRoutes from './routes/dataRoutes.js';


dotenv.config();


const port = process.env.PORT || 7000; 


const app = express();

app.use(express.json({limit: '50mb'}));


app.use(cors())
conectDb()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use('/api/client',clientRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/datadetail', dataDetailRoutes);
app.use('/api/dashboard', dashboardRoutes);



swaggerConfig(app);




app.get('/', (req, res) => {
    res.send("API is running...");
})