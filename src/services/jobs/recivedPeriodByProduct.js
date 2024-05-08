import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv'
import Client from '../../models/client.js'
import DataDetail from '../../models/dataDetail.js'
import { v4 as uuidv4} from 'uuid';

///se ejecuta cada 30 minutos///
//cron.schedule('*/30 * * * *', async () => {
cron.schedule('* * * * *', async () => {
  const productsEnum = "FRU"
  const clientId= "23fd6d18-927a-470e-8d71-f2959a174d1"
  const dataId ="932341bc-99ed-4209-a092-9e111dcca98c"
  const model = await Client.findOne( { where : {id:clientId, dataId}});
  const company = model.company


  console.log('Traigo la data del servicio Net del cliente:',company);
  const datadetails = await getRecivedPeriodByProduct(company);  
  try {
    const saltRounds = 7;
    for (const item of datadetails) {
      let xValue = item.x
      let yValue = item.y
      var id = uuidv4() 
      let object = {id,dataId,name:productsEnum,xValue,yValue}
      const model = await DataDetail.findOne( { where : {xValue}});
      if(model==null){
        DataDetail.create(object)  
        console.log("se ingreso el registro")
      }
      else{
        if(model.yValue!=object.yValue){
          await DataDetail.update({yValue},{ where: { id:model.id } } )
        }
        else{    
          console.log("tienen valores identicos "+model.yValue+" por:"+model.yValue)
        }
      }
     
           
    }    
  } catch (error) {
    console.error('Error al ingregar la data:', error);
  }
});


async function getRecivedPeriodByProduct(company) {
  try {   
    const url = "http://172.30.20.143:5076/get-recived-period-by-product?productsEnum=FRU&company="+company
    const response = await axios.get(url, { timeout: 9000 });
    const datadetails = response.data;
    console.log('datadetails obtenidos:', datadetails);
    return datadetails;
  } catch (error) {
    console.error('Error al consultar datadetails:', error);
    return null
  }
}


