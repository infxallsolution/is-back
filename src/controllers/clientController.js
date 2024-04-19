import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import {getClientDB,getList,updateByNit} from "../services/client/ClientServices.js";




async function updateClient(req,res){    
    if (!req.query.nit) {
        throw "Se necesita el nit del cliente";
      }
    const nit = req.query.nit;
    let dataresult = await updateByNit(nit,"nuevo");    
    return res.status(200).json(dataresult);    
}




async function listClients(req,res){ 
    let dataresult = await getList();    
    return res.status(200).json(dataresult);   
}



async function insertClient(req,res){ 
    
    res.send("insertClient");
}



const getClient = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        throw "Se necesita el id del cliente";
      }
    const idClient = req.query.id;
    let dataresult = await getClientDB(idClient);    
    return res.status(200).json(dataresult);    
});




async function deleteClient(req,res){ 
    
    res.send("deleteClient");
}



export default {
    listClients,
    insertClient, 
    updateClient,
    getClient,
    deleteClient    
}