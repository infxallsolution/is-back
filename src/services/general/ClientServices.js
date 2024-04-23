
import Client from '../../models/client.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'



const getClient= async(idClient)=>{
  const client = await Client.findOne( { where : {id:idClient}});
  return client
}

const getClientByNit= async(nit)=>{
  const client = await Client.findOne( { where : {nit:nit}});
  return client
}

const getList= async()=>{
    const list = await Client.findAll();
    return list
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

console.log(newType)

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