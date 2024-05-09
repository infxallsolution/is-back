
import DataDetail from '../../models/dataDetail.js'


const getList= async(dataId)=>{ 
console.log("solocita el dataId:",dataId)

  try{
    const list = await DataDetail.findAll({
      attributes: [
      ['xValue', 'time'], 
      ['yValue', 'value'],  
    ], 
    where:{dataId},
    order:[['time','ASC']]
  }
  );
    return { list:list, status:200 };
  }catch(err){
    return { list:null, status:500 , error:err };
  }  
}




export default {
    getList
};