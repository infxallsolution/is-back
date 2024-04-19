
import Client from '../../models/client.js'



const getClientDB= async(nit)=>{
    const client = await Client.findAll( { where : {nit:nit}});
    return client
}

const getList= async()=>{
    const list = await Client.findAll();
    return list
}


const updateByNit= async(clientNit,newName)=>{
    Client.update(
        { name: newName},
        { where: { nit: clientNit } } 
      )
      .then((result) => {
        console.log(`Se actualizó el cliente con NIT ${clientNit}`);
      })
      .catch((error) => {
        console.error('Error al actualizar el cliente:', error);
      });
}



export {
    getClientDB,
    getList,
    updateByNit
};