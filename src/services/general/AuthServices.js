
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js'
import { v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv'

const login= async(username,password)=>{
  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return { message: 'Usuario no encontrado', status:404 };
    }
    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.error('Contraseña incorrecta');
      return { message: 'Contraseña incorrecta', status:401 };
    }
    // Generar token de autenticación
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Enviar token como respuesta
    return { token, status:200 };
  } catch (error) {
    console.error('Error en el login:', error);
    return { message: 'Error en el servidor', status:500 };
  }
}


const insertUser= async(username,passwordPlain)=>{
  var id = uuidv4()
  const password = await bcrypt.hash(passwordPlain,7)
  try{
    var res = await User.create({id,username,password})
    return { message: 'Usuario creado', status:200 };
  }catch(err){
    return { message: 'Error en el servidor'+err, status:500 };
  }  
}



export default {
    insertUser,
    login
};