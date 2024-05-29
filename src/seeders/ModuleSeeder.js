
import Module from '../models/module.js'
import ModuleClient from '../models/moduleClient.js'
import Client from '../models/client.js'
import { v4 as uuidv4 } from 'uuid';

async function createModules() {
  try {

    const list = await Client.findAll();

    let model = await Module.findOne({ where: { id: 1 } });
    console.log(model)
    if (model == null) { await Module.create({ id: 1, name: 'produccion', description: 'Producción', state: true }) }

    model = await Module.findOne({ where: { id: 2 } });
    if (model == null) { await Module.create({ id: 2, name: 'laboratorio', description: 'Laboratorio', state: true }) }

    model = await Module.findOne({ where: { id: 3 } });
    if (model == null) { await Module.create({ id: 3, name: 'logistic', description: 'Comercial', state: true }) }

    model = await Module.findOne({ where: { id: 4 } });
    if (model == null) { await Module.create({ id: 4, name: 'casino', description: 'Casino', state: true }) }

    model = await Module.findOne({ where: { id: 5 } });
    if (model == null) { await Module.create({ id: 5, name: 'administracion', description: 'Administracion', state: true }) }

    model = await Module.findOne({ where: { id: 6 } });
    if (model == null) { await Module.create({ id: 6, name: 'contabilidad', description: 'Contabilidad', state: true }) }

    model = await Module.findOne({ where: { id: 7 } });
    if (model == null) { await Module.create({ id: 7, name: 'bascula', description: 'Bascula', state: true }) }
    
    model = await Module.findOne({ where: { id: 8 } });
    if (model == null) { await Module.create({ id: 8, name: 'nomina', description: 'Nomina', state: true }) }

    model = await Module.findOne({ where: { id: 9 } });
    if (model == null) { await Module.create({ id: 9, name: 'mantenimiento', description: 'Mantenimiento', state: true }) }

    model = await Module.findOne({ where: { id: 10 } });
    if (model == null) { await Module.create({ id: 10, name: 'automatizacion', description: 'Automatización', state: true }) }
    
    model = await Module.findOne({ where: { id: 11 } });
    if (model == null) { await Module.create({ id: 11, name: 'agronomico', description: 'Agronomico', state: true }) }
    
    model = await Module.findOne({ where: { id: 12 } });
    if (model == null) { await Module.create({ id: 12, name: 'tarima', description: 'Tarima', state: true }) }

    model = await Module.findOne({ where: { id: 13 } });
    if (model == null) { await Module.create({ id: 13, name: 'reception', description: 'Reception', state: true }) }


    //se agregan los modulos a los clientes creados//
    for (const client of list) {
      const listModules = await Module.findAll();
      for (const module of listModules) {
        let moduleId = module.id
        let clientId = client.id
        model = await ModuleClient.findOne({ where: { moduleId, clientId } });
        if (model == null) {
          let state = true
          let id = uuidv4()
          await ModuleClient.create({id, clientId, moduleId, state})
        }
      }
    }

    console.log("Exito")
  } catch (err) {
    console.log("error seeder:" + err)
  }
}

export default { createModules };