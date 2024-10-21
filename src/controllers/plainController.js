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
  res.download("", './files/plano_nomina.txt', (err) => {
    if (err) {
      res.status(500).send({ status: 'error', message: 'Error al enviar el archivo.' });
    }
  });
}


async function deleteFile(req, res) {

}


async function convertFileNominaController(req, res) {
  if (!req.body.file) {
    console.log("no file")
    throw "Seleccione un archivo";
  }

  let filename = req.body.file
  const resultado = await plainServices.generatePlainNomina(req.body)
  console.log("res del controller", resultado)
  res.status(resultado.status).json({ message: resultado.message, success: resultado.success, filename:resultado.filename });
}




async function convertFileSalidaController(req, res) {
  if (!req.body.file) {
    console.log("no file")
    throw "Seleccione un archivo";
  }

  let filename = req.body.file
  const resultado = await plainServices.generatePlainSalida(req.body)
  console.log("res del controller", resultado)
  res.status(resultado.status).json({ message: resultado.message, success: resultado.success, filename:resultado.filename });

}




export default {
  uploadFileController,
  convertFileNominaController,
  convertFileSalidaController
}