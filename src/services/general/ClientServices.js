
import Client from '../../models/client.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'

const getClient= async(idClient)=>{
  try{
    const client = await Client.findOne( { where : {id:idClient}});
    return { client, status:200 };
  }catch(err){
    return { client:null, status:500 , error:err };
  }  

}

const getClientByNit= async(nit)=>{ 
  try{
    const client = await Client.findOne( { where : {nit:nit}});
    return { client, status:200 };
  }catch(err){
    return { client:null, status:500 , error:err };
  }  
}

const getList= async()=>{ 
    try{
      const list = await Client.findAll();
      return { list:list, status:200 };
    }catch(err){
      return { list:null, status:500 , error:err };
    }  
}


const insertClient= async(body)=>{
  var id = uuidv4()
  var cliente = {...body,id}
  try{
    var res = await Client.create(cliente)
    return { message: 'Cliente ingresado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}



const updateByNit= async(clientNit,newName,newType)=>{
  try{
    var res = await Client.update(
      { name: newName, type:newType},
      { where: { nit: clientNit } } 
    )
    return { message: 'Cliente actualizado por nit', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500, error:err };
  }  
}


const updateClient= async(idClient,newName,newType)=>{
  try{
    var res = await Client.update(
      { name: newName, type:newType},
      { where: { id: idClient } } 
    )
    return { message: 'Cliente actualizado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500, error:err };
  }  
}



export default {
    getClient,
    getClientByNit,
    getList,
    updateByNit,
    insertClient,
    updateClient
};