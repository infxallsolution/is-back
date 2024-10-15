import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectDb from './config/db.js'
import swaggerConfig  from './config/swaggerConfig.js';
import routes from './routes/indexRoutes.js'
import ModuleSeeder from './seeders/ModuleSeeder.js';
dotenv.config();

///ejecuto los jobs de sincronización ///
//import './services/jobs/synchronizeUsers.js'


//import './services/jobs/recivedDailyByProduct.js'
//import './services/jobs/productionDailyByProduct.js'

//ojo periodo y anual ya no lo uso, porque lo saco mendiente consultas del diario///
//import './services/jobs/recivedPeriodByProduct.js'
//import './services/jobs/productionPeriodByProduct.js'

const port = process.env.PORT || 7000; 

const app = express();

app.use(express.json({limit: '50mb'}));


let allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://planos.infxsolution.com/");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(allowCors);




conectDb()
app.listen(port, () => {
    //cambio el message running
    console.log(`Server is running on port::: ${port}`)
})

//ModuleSeeder.createModules()
swaggerConfig(app);

app.use(routes)

app.get('/', (req, res) => {
    res.send("API is running 2024...");
})