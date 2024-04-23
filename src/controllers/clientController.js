import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import clientServices from "../services/general/ClientServices.js";




async function insertClientController(req, res) {
    if (!req.body.nit) {
        throw "Se necesita el nit del cliente";
    }
    const body = req.body
    let dataresult = await clientServices.insertClient(body);
    return res.status(dataresult.status).json(dataresult);
}

async function updateClientByNitController(req, res) {
    if (!req.body.nit) {
        return res.status(500).json({ message: "se necesita el nit del cliente" });
    }
    if (!req.body.type) {
        return res.status(500).json({ message: "se necesita el tipo del cliente" });
    }
    const nit = req.body.nit;
    const name = req.body.name;
    const type = req.body.type;
    let dataresult = await clientServices.updateByNit(nit, name,type);
    return res.status(dataresult.status).json(dataresult);
}


async function updateClientController(req, res) {
    if (!req.body.id) {
        return res.status(500).json({ message: "se necesita el id del cliente" });
    }
    if (!req.body.type) {
        return res.status(500).json({ message: "se necesita el tipo del cliente" });
    }
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    let dataresult = await clientServices.updateClient(id, name, type);
    return res.status(dataresult.status).json(dataresult);
}



/**
 * @swagger
 * /api/client/list:
 *   get:
 *     summary: Obtiene todos los clientes
 *     description: Retorna una lista de todos los clientes registrados.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve una lista de clientes.
 *       500:
 *         description: Error interno del servidor.
 */
async function listClientsController(req, res) {
    let dataresult = await clientServices.getList();
    return res.status(200).json(dataresult);
}



const getClientController = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        throw "Se necesita el id del cliente";
    }
    const idClient = req.query.id;
    let dataresult = await clientServices.getClient(idClient);
    return res.status(200).json(dataresult);
});


const getClientByNitController = asyncHandler(async (req, res) => {
    if (!req.query.nit) {
        throw "Se necesita el id del cliente";
    }
    const nitClient = req.query.nit;
    let dataresult = await clientServices.getClientByNit(nitClient);
    return res.status(200).json(dataresult);
});




async function deleteClientController(req, res) {

    res.send("deleteClient");
}



export default {
    listClientsController,
    insertClientController,
    updateClientController,
    updateClientByNitController,
    getClientController,
    getClientByNitController,
    deleteClientController
}