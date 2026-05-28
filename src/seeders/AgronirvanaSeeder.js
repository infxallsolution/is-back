import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Client from '../models/client.js';
import Company from '../models/company.js';
import User from '../models/user.js';
import Module from '../models/module.js';
import ModuleClient from '../models/moduleClient.js';

async function createAgronirvana() {
  try {
    // 1. Crear cliente
    let client = await Client.findOne({ where: { identification: '006' } });
    if (!client) {
      client = await Client.create({
        id: uuidv4(),
        identification: '006',
        name: 'Agronirvana SAS',
        type: 'BANANO',
        state: true,
        company: 6,
      });
      console.log('Cliente Agronirvana SAS creado:', client.id);
    } else {
      console.log('Cliente Agronirvana SAS ya existe:', client.id);
    }

    // 2. Crear empresa (compañía 6)
    let company = await Company.findOne({ where: { clientId: client.id, numberId: 6 } });
    if (!company) {
      company = await Company.create({
        id: uuidv4(),
        name: 'Agronirvana SAS',
        numberId: 6,
        clientId: client.id,
      });
      console.log('Empresa creada con numberId 6:', company.id);
    } else {
      console.log('Empresa con numberId 6 ya existe:', company.id);
    }

    // 3. Crear usuario
    let user = await User.findOne({ where: { username: 'agronirvana', clientId: client.id } });
    if (!user) {
      const hashedPassword = await bcrypt.hash('1234567', 7);
      user = await User.create({
        id: uuidv4(),
        clientId: client.id,
        username: 'agronirvana',
        name: 'Agronirvana SAS',
        password: hashedPassword,
        email: 'auxiliarcontable@papare.com.co',
        state: true,
        lastCompany: '006',
      });
      console.log('Usuario agronirvana creado:', user.id);
    } else {
      console.log('Usuario agronirvana ya existe:', user.id);
    }

    // 4. Asignar todos los módulos al cliente
    const listModules = await Module.findAll();
    for (const module of listModules) {
      const moduleId = module.id;
      const clientId = client.id;
      const existing = await ModuleClient.findOne({ where: { moduleId, clientId } });
      if (!existing) {
        await ModuleClient.create({ id: uuidv4(), clientId, moduleId, state: true });
        console.log(`Módulo ${module.name} asignado`);
      }
    }

    console.log('Seeder Agronirvana completado con éxito');
  } catch (err) {
    console.log('Error en seeder Agronirvana:', err);
  }
}

export default { createAgronirvana };
