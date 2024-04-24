

import ModuleClient from '../../models/moduleClient.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const get= async(idFind)=>{
  const model = await ModuleClient.findOne( { where : {id:idFind}});
  return model
}

const getModulesByClient= async(id)=>{
  const model = await ModuleClient.findAll( { where : {clientId:id}});
  return model
}

const getList= async()=>{ 
  try{
    const list = await ModuleClient.findAll();
    return { list:list, status:200 };
  }catch(err){
    return { list:null, status:500 , error:err };
  }  
}


const insert= async(body)=>{
  try{
    var res = await ModuleClient.create(body)
    return { message: 'Modulo asignado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}


const deleteReg = async(body)=>{
  try{
    await ModuleClient.destroy({
      where: {
        moduleId: body.moduleId,
        clientId: body.clientId
      },
    });
    return { message: 'Modulo desasignado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



export default {
    get,
    getModulesByClient,
    getList,
    insert,
    deleteReg
};