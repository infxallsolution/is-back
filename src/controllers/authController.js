// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import authServices from '../services/general/AuthServices.js'


  const loginController = async (req, res) => {
    console.log("loginnn")
    console.log(req)
  const { username, password } = req.body;
  var dataresult = await authServices.login(username,password)
  return res.status(dataresult.status).json(dataresult); 
};

const insertUserController= async(req,res)=>{
  console.log(req.body)
  const { username, password } = req.body;
  var dataresult = await authServices.insertUser(username,password)
  return res.status(dataresult.status).json(dataresult); 
}


export  {
  loginController,
  insertUserController
}


