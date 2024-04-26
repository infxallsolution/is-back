import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';


const __dirname = path.resolve();
const ruta = `${path.join(__dirname, 'src/routes/*.js')}`
console.log(__dirname)
console.log(ruta)

const options = {
  swaggerDefinition: {
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Documentación de tu API con Swagger',
    }
  },
  apis: [ruta], // Rutas de tus archivos de ruta
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};