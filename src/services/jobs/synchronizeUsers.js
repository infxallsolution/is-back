import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv'
import User from '../../models/user.js'
import bcrypt from 'bcrypt';
import { v4 as uuidv4} from 'uuid';

///se ejecuta cada 30 minutos///
cron.schedule('*/30 * * * *', async () => {
  console.log('Traigo los usuarios del servicio Net 8');
  const usuarios = await obtenerUsuarios();  
  try {
    const saltRounds = 7;
    for (const usuario of usuarios) {
      let username = usuario.username;
      let passwordPlain = usuario.clave;
      var id = uuidv4() 
      const hashedPassword = await bcrypt.hash(passwordPlain, saltRounds);
      const model = await User.findOne( { where : {username}});
      if(model==null){
        let clientId= "23fd6d18-927a-470e-8d71-f2959a174d1"
        await User.create({id,username,password:hashedPassword,clientId})
        console.log("usuario creado")
      }
      else{
        const isValidPassword = await bcrypt.compare(passwordPlain, model.password);
        if (!isValidPassword) {
          await User.update(
            {password:hashedPassword},
            { where: { id: model.id } }
          ) 
          console.log("password actualizado")
        }
        else{
          console.log("La contraseña es la misma")
        }        
      }  
    }    
  } catch (error) {
    console.error('Error al ingregar los usuarios:', error);
  }
});


async function obtenerUsuarios() {
  try {    
    const response = await axios.get(process.env.URL_USERS);
    const usuarios = response.data;
    console.log('Usuarios obtenidos:', usuarios);
    return usuarios;
  } catch (error) {
    console.error('Error al consultar usuarios:', error);
    return null
  }
}


