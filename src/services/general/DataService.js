
import Data from '../../models/data.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const get= async(idFind)=>{
  const model = await Data.findOne( { where : {id:idFind}});
  return model
}

const getList= async()=>{
    const list = await Data.findAll();
    return list
}


const insert= async(body)=>{
  var id = uuidv4()
  var model = {...body,id}
  try{
    var res = await Data.create(model)
    return { message: 'Data ingresado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



export default {
    get,
    getList,
    insert
};