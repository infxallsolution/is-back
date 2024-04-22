import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (tokenJWT)=>{

    try{
        return jwt.verify(tokenJWT, JWT_SECRET)
    }catch(e){
        console.log(e)
        return null
    }
    
}
const tokenSing = async (user)=>{
    const sing = await jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        JWT_SECRET,
        {
            expiresIn:"2h"
        }
    )

    return sing;
}


export default  {tokenSing,verifyToken}