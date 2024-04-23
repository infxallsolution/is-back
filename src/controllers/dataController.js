import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import dataService from "../services/general/DataService.js";




async function insertController(req,res){    
    if (!req.body.name) {
        throw "Se necesita el nombre del detail";
      }
    const body = req.body
    let dataresult = await dataService.insert(body); 
    return res.status(dataresult.status).json(dataresult); 
}


async function listController(req,res){ 
    let dataresult = await dataService.getList();    
    return res.status(dataresult.status).json(dataresult.list);   
}



const getController = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        throw "Se necesita el id del detail";
      }
    const idFind = req.query.id;
    let dataresult = await dataService.get(idFind);    
    return res.status(200).json(dataresult);    
});



async function deleteController(req,res){     
    res.send("delete");
}



export default {
    listController,
    insertController, 
    getController,
    deleteController
}