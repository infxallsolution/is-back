import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv'
import Client from '../../models/client.js'
import Data from '../../models/data.js'
import DataDetail from '../../models/dataDetail.js'
import { v4 as uuidv4 } from 'uuid';

///se ejecuta cada 30 minutos///
//cron.schedule('*/30 * * * *', async () => {
//cron.schedule('* * * * *', async () => {

const clientId = process.env.ID_CLIENT
const urlService = process.env.URL_SERVICE


cron.schedule('* * * * *', async () => {

  try {
    const datas = await Data.findAll({ where: { clientId } });
    const client = await Client.findOne( { where : {id:clientId}}); 
    const company = client.company

    ///Recorro el listado de series que tiene un usuario asignado
    
      let dataId = "c4ebd95d-66c5-4625-bb8d-d2fb01521f41"
      let endpoint = "get-production-period-by-product"
      let product = "ADPA"
      let year = "2015"
      let url = `${urlService}${endpoint}?productsEnum=${product}&company=${company}&year=${year}`
      console.log(`LA URL ES: ${url} y su dataId: ${dataId}`)

      const datadetails = await getData(url); 
      
      ///Ingreso los datadetails que retorna el ednpoint
      for (const item of datadetails) {
        let xValue = item.x
        let yValue = item.y
        yValue = yValue/1000
        let name = product      
        var id = uuidv4() 
        let object = {id,dataId,name,xValue,yValue}
        const model = await DataDetail.findOne( { where : {xValue,dataId,name}});
        if(model==null){
          DataDetail.create(object)  
          console.log("se ingreso el registro")
        }
        else{
          if(model.xValue==object.xValue && model.dataId == dataId && model.name == name){
            if(model.yValue!=object.yValue)
              await DataDetail.update({yValue},{ where: { id:model.id } } )
            else
              console.log("tienen valores identicosssss "+model.yValue+" por:"+model.yValue)
          }
        }    
      } 
      

  } catch (error) {
    console.error('Error al ingregar la data:', error);
  }

});


async function getData(url) {
  try {
    const response = await axios.get(url, { timeout: 9000 });
    const datadetails = response.data;
    console.log('datadetails obtenidos:', datadetails);
    return datadetails;
  } catch (error) {
    console.error('Error al consultar datadetails:', error);
    return null
  }
}


