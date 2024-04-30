import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectDb from './config/db.js'
import swaggerConfig  from './config/swaggerConfig.js';
import routes from './routes/indexRoutes.js'
import ModuleSeeder from './seeders/ModuleSeeder.js';

///ejecuto los jobs ///
//import './services/jobs/synchronizeUsers.js'


dotenv.config();

const port = process.env.PORT || 7000; 


const app = express();

app.use(express.json({limit: '50mb'}));

//hola

app.use(cors())
conectDb()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

ModuleSeeder.createModules()
swaggerConfig(app);

app.use(routes)

app.get('/', (req, res) => {
    res.send("API is running...");
})