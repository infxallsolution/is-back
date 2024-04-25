
import Module from '../models/module.js'

async function createModules() {
  try {
    await Module.destroy({
      where: {}});
    await Module.bulkCreate([
      { id: 1, name: 'Producción', state: 1 },
      { id: 2, name: 'Laboratorio', state: 1 },
      { id: 3, name: 'Comercial', state: 1 },
      { id: 4, name: 'Casino', state: 1 },
      { id: 5, name: 'Administracion', state: 1 },
      { id: 6, name: 'Facturación', state: 1 },
      { id: 7, name: 'Bascula', state: 1 },
    ]);
    console.log("Exito")
  } catch (err) {
    console.log("error seeder:" + err)
  }
}

export default { createModules };