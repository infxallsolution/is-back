import express from 'express'
import controller from '../controllers/plainController.js'
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router()
import { v4 as uuidv4 } from 'uuid';


import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { promises as fsp } from 'fs'; // Importamos fs.promises

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/');
  },
  filename: function (req, file, cb) {
    let id = uuidv4()
    cb(null, id + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


/**
* @swagger
* /api/plain/upload:
*   post:
*     summary: Obtiene todos un modulo por id
*     tags:
*       - Plain
*     description: Carga un archivo y lo guarda en la carpeta "files".
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*                 description: El archivo que se va a subir.
*     responses:
*       200:
*         description: Archivo subido exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 file:
*                   type: object
*       400:
*         description: No se subió ningún archivo.
*/
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  res.send({
    status: 'success',
    file: req.file,
  });
});

//router.post('/upload',controller.uploadFile)


// Ruta para eliminar un archivo
router.delete('/delete/:filename', (req, res) => {
  const { filename } = req.params;

  // Ruta completa del archivo a eliminar
  const filePath = path.join("", 'files', filename);

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ status: 'error', message: 'Archivo no encontrado.' });
    }

    // Eliminar el archivo
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send({ status: 'error', message: 'Error al eliminar el archivo.' });
      }

      res.send({ status: 'success', message: 'Archivo eliminado exitosamente.' });
    });
  });
});







/**
* @swagger
* /api/plain/plainnomina:
*   post:
*     summary: convierte el archivo de nomina
*     tags:
*       - Plain
*     description: convierte el archivo de nomina
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               plain:
*                 type: string
*               file:
*                 type: string
*               notas:
*                 type: string
*               numero:
*                 type: string
*               type:
*                 type: string
*               company:
*                 type: string
*               fecha:
*                 type: string
*               clientId:
*                 type: string
*               moduleId:
*                 type: string
*     responses:
*       200:
*         description: Archivo convertido exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 file:
*                   type: object
*       400:
*         description: No se convirtió el archivo.
*/
router.post('/plainnomina', controller.convertFileNominaController);







/**
* @swagger
* /api/plain/plainsalida:
*   post:
*     summary: convierte el archivo de salida
*     tags:
*       - Plain
*     description: convierte el archivo de salida
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               plain:
*                 type: string
*               file:
*                 type: string
*               notas:
*                 type: string
*               numero:
*                 type: string
*               type:
*                 type: string
*               company:
*                 type: string
*               fecha:
*                 type: string
*     responses:
*       200:
*         description: Archivo convertido exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 file:
*                   type: object
*       400:
*         description: No se convirtió el archivo.
*/
router.post('/plainsalida', controller.convertFileSalidaController);



/**
* @swagger
* /api/plain/download:
*   get:
*     summary: Obtiene todos un modulo por id
*     tags:
*       - Plain
*     description: Carga un archivo y lo guarda en la carpeta "files".
*     parameters:
*       - in: query
*         name: filename
*         description: nombre del archivo
*         required: true
*         default: nomina.xlsx
*         schema:
*           type: string
*       - in: query
*         name: folder
*         description: folder
*         required: true
*         default: excel
*         schema:
*           type: string
*     responses:
*       200:
*         description: Archivo convertido exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: success
*                 file:
*                   type: object
*       400:
*         description: No se convirtió el archivo.
*/
router.get('/download',async (req, res) =>  {


  if(!req.query.filename){
    res.status(404).send('se necesita el nombre.');
  }
  if(!req.query.folder){
    res.status(404).send('se necesita el folder.');
  }

  let filename = req.query.filename
  let folder = req.query.folder


  console.log("filename",filename)
  console.log("folder",folder)

  let filePath = `./${folder}/${filename}`;
  await fsp.access(filePath);
  try {
    await fsp.access(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error al descargar el archivo.');
      } else {
        res.end(); // Asegura que la conexión se cierre
      }
    });
  } catch (error) {
    console.error('Error al acceder al archivo:', error);
    res.status(404).send('Archivo no encontrado.');
  }
});


export default router