import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import service from "../services/general/RecordService.js";




async function insertController(req,res){    
    if (!req.body.moduleId) {
        throw "Se necesita un modulo";
      }
    const body = req.body
    console.log("antes de ingresar controller")
    let dataresult = await service.insert(body); 
    console.log("despues de ingresar controller",dataresult)
    return res.status(200).json(dataresult); 
}












async function listController(req,res){ 
    let dataresult = await service.getList();    
    return res.status(dataresult.status).json(dataresult.list);   
}



const getController = asyncHandler(async (req, res) => {
    if (!req.query.id) {
        throw "Se necesita el id del detail";
      }
    const idFind = req.query.id;
    let dataresult = await service.get(idFind);    
    return res.status(200).json(dataresult);    
});






export default {
    listController,
    insertController, 
    getController
}