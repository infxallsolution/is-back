
import Company from '../../models/company.js'
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2'
import planoNominaService from './PlanoNominaService.js';
import planoSalidaService from './PlanoSalidaInsumosService.js';




const generatePlainNomina = async (body,res) => {
  try {
    console.log("plain services nomina")
    console.log(body)
    const resultado = await planoNominaService.generateFile(body)
    return resultado
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}


const generatePlainSalida = async (body) => {

  try {
    console.log("plain services salida")
    console.log(body)
    const resultado = await planoSalidaService.generateFile(body)
    return resultado
  } catch (err) {
    return { message: 'Error en el servidor', status: 500, error: err };
  }
}



export default {
  generatePlainNomina,
  generatePlainSalida
};