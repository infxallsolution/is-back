
import Client from '../../models/client.js'
import { v4 as uuidv4} from 'uuid';
import mysql from  'mysql2'

const getClient= async(idClient)=>{
  try{
    const client = await Client.findOne( 
      { 
        where : {id:idClient},
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
      );
    return { client, status:200 };
  }catch(err){
    return { client:null, status:500 , error:err };
  }  

}


const getList= async()=>{ 
    try{
      const list = await Client.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }});
      return { list:list, status:200 };
    }catch(err){
      return { list:null, status:500 , error:err };
    }  
}


const insertClient= async(body)=>{
  var id = uuidv4()
  var client = {...body,id}
  try{
    var res = await Client.create(client)
    return { message: 'Cliente ingresado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor', status:500 , error:err };
  }  
}


const updateClient= async(client)=>{
  try{      
      var res = await Client.update(
      client,
      { where: { id: client.id } } 
    )
    return { message: 'Cliente actualizado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor upload', status:500, error:err };
  }  
}



export default {
    getClient,
    getList,
    insertClient,
    updateClient
};