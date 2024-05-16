
import DataDetail from '../../models/dataDetail.js'
import Data from '../../models/data.js'
import { Op } from "sequelize";



///se debe llamar algo así como dashboar cliente. compuesto por todos los dada del cliente y sus series
const getDataDetailsByClient= async(clientId)=>{ 
  try{
    const list = await Data.findAll({ 
      where : {clientId},
      attributes:  ['id', 'name'] 
    });


    const arreglo = []
    for (const item of list) {
        let data = await getListData(item.id)
        arreglo.push({ title: item.name, data});
    }


    return { list:arreglo, status:200 };
  }catch(err){
    return { list:null, status:500 , error:err };
  }  
}








///METODO LOCAL QUE SIRVE PARA TRAER LOS DIFERENTES DATA Y OBTENER SU DATADETAIL
const getListData = async (dataId) => {
  console.log("solocita el dataId:", dataId)
  const data = await Data.findOne({where : {id:dataId}});
  let products = data.product;
  const list = products.split(',');
  const arreglo = []
  for (const item of list) {
    let dataDetails = await getDataDetailsByData(dataId,item)
    arreglo.push({ title: item, data:dataDetails});
  }
  return arreglo;
}


///METODO LOCAL QUE RETORNA EL DATADETAIL POR CADA DATA
const getDataDetailsByData = async (dataId,product) => {
  try {
    const list = await DataDetail.findAll({
      attributes: [
        ['xValue', 'time'],
        ['yValue', 'value']
      ],
      where: { dataId, name:product },
      order: [['time', 'ASC']]
    }
    );  
    return list;
  } catch (err) {
    return null;
  }
}






const getList = async (dataId) => {
  console.log("solocita el dataId:", dataId)
  const data = await Data.findOne({where : {id:dataId}});
  let products = data.product;
  const list = products.split(',');
  const arreglo = []
  for (const item of list) {
    let dataDetails = await getDataDetailsByData(dataId,item)
    arreglo.push({ title: item, data:dataDetails});
  }
  return { list: arreglo, status: 200 };
}











const getDataDetailsByClientDate = async (clientId) => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');  
  DataDetail.belongsTo(Data, { foreignKey: 'dataId'})
  Data.hasMany(DataDetail, { foreignKey: 'dataId'})
  try {
    const list = await Data.findAll({
      include: [
        {
          model: DataDetail,
          attributes: [
            ['xValue', 'time'],
            ['yValue', 'value'],
            ['name', 'name'],
          ],
          required: true,
          where:{xValue: { [Op.between]: [startDate, endDate] }}
        }
      ],
      attributes: ['id', 'name'],
      where: {clientId},
      order: [
        [ { model: DataDetail }, 'xValue', 'ASC' ]  
      ]
    });  

    return { list: list, status: 200 };
  } catch (err) {
    console.log(err)
    return { list: null, status: 500, error: err };
  }

}






export default {
  getList,
  getDataDetailsByClient,
  getDataDetailsByClientDate
};