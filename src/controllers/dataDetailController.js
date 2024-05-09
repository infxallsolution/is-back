import dotenv from 'dotenv'
import express from "express";
import asyncHandler from "express-async-handler";

import dataDetailService from "../services/general/DataDetailService.js";


async function listController(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ message: "se necesita el id de la data" });
    }   
    let dataresult = await dataDetailService.getList(req.params.id);
    return res.status(dataresult.status).json(dataresult.list);
}


export default {
    listController
}