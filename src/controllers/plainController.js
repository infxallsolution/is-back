import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import service from "../services/general/plainServices.js";
import plainServices from '../services/general/plainServices.js';


import fs from 'fs';
import multer from 'multer';
import path from 'path';





async function uploadFileController(req, res) {



  console.log("entro por aca")
  console.log(req)

  /* if (!req.body.name) {
       throw "Se necesita el nombre del detail";
     }
   const body = req.body
   let dataresult = await service.insert(body); 
   return res.status(dataresult.status).json(dataresult); */


  // Devolver el archivo .txt como respuesta
  res.download("", './files/plano_nomina.txt', (err) => {
    if (err) {
      res.status(500).send({ status: 'error', message: 'Error al enviar el archivo.' });
    }
  });

  //return res.status("200").json("hola")
}




async function deleteFile(req, res) {


}


async function convertFileNominaController(req, res) {

  if (!req.body.file) {
    console.log("no file")
    throw "Seleccione un archivo";
  }

  await plainServices.generatePlainNomina(req.body)
  let filename = req.body.file
  const plainName = filename.replace(".xlsx", '.txt')

  const txtFilePath = './files/' + plainName;
  // Devolver el archivo .txt como respuesta
  res.download(txtFilePath, plainName, (err) => {
    if (err) {
      res.status(500).send({ status: 'error', message: 'Error al enviar el archivo.' });
    }
  });
}




async function convertFileSalidaController(req, res) {

  if (!req.body.file) {
    console.log("no file")
    throw "Seleccione un archivo";
  }

  await plainServices.generatePlainSalida(req.body)
  let filename = req.body.file
  const plainName = filename.replace(".xlsx", '.txt')

  const txtFilePath = './files/' + plainName;
  // Devolver el archivo .txt como respuesta
  res.download(txtFilePath, plainName, (err) => {
    if (err) {
      res.status(500).send({ status: 'error', message: 'Error al enviar el archivo.' });
    }
  });
}





export default {
  uploadFileController,
  convertFileNominaController,
  convertFileSalidaController
}