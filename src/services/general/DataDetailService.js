
import DataDetail from '../../models/dataDetail.js'
import Data from '../../models/data.js'


const getList = async (dataId) => {
  console.log("solocita el dataId:", dataId)

  try {
    const list = await DataDetail.findAll({
      attributes: [
        ['xValue', 'time'],
        ['yValue', 'value'],
      ],
      where: { dataId },
      order: [['time', 'ASC']]
    }
    );
    return { list: list, status: 200 };
  } catch (err) {
    return { list: null, status: 500, error: err };
  }
}



const getDataDetailsByClient = async (clientId) => {

  
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
          ],
          required: true
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
  getDataDetailsByClient
};