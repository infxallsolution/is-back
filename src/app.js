import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectDb from './config/db.js'
import swaggerUi from "swagger-ui-express";
import swaggerConfig  from './config/swaggerConfig.js';
import clientRoutes from './routes/clientRoutes.js'

dotenv.config();


const port = process.env.PORT || 7000; 


const app = express();
app.use(cors())
conectDb()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use('/api/client',clientRoutes)

swaggerConfig(app);
app.get('/', (req, res) => {
    res.send("API is running...");
})