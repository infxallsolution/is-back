import bcrypt from 'bcrypt';


const encrypt = async (passwordPlain)=>{
    const hash = await bcryptjs.hash(passwordPlain,7)
    return hash;
}

const compare = async (passwordPlain,hashPassword)=>{
    return await bcryptjs.compare(passwordPlain,hashPassword)    
}

export default {encrypt,compare}