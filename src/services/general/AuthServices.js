
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js'
import Client from '../../models/client.js'
import { v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv'

const login= async(username,password,identification)=>{
  const JWT_SECRET = process.env.JWT_SECRET
  try {    
    const client = await Client.findOne({ where: { identification } });

    const user = await User.findOne({ where: { username,clientId:client.id } });
    if (!user) {
      return { message: 'Usuario no encontrado', status:404 };
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.error('Contraseña incorrecta');
      return { message: 'Contraseña incorrecta', status:401 };
    }
    const token = jwt.sign(
        {
            id:user.id
        },
        JWT_SECRET,
        {
            expiresIn:"2h"
        });
    return { token, status:200 };
  } catch (error) {
    console.error('Error en el login:', error);
    return { message: 'Error en el servidor', status:500 };
  }
}


const insertUser= async(username,passwordPlain,identification)=>{
  var id = uuidv4()
  const password = await bcrypt.hash(passwordPlain,7)
  try{
    const client = await Client.findOne({ where: { identification } });
    var res = await User.create({id,username,password,clientId:client.id})
    return { message: 'Usuario creado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor'+err, status:500 };
  }  
}



export default {
    insertUser,
    login
};