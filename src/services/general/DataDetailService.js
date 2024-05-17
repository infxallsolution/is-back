
import DataDetail from '../../models/dataDetail.js'
import Data from '../../models/data.js'
import { Op } from "sequelize";
import { Sequelize } from 'sequelize';



///se debe llamar algo así como dashboar cliente. compuesto por todos los dada del cliente y sus series
const getDataDetailsByClient = async (clientId, option) => {
  try {
    const list = await Data.findAll({
      where: { clientId },
      attributes: ['id', 'name']
    });
    const arreglo = []
    for (const item of list) {
      let data = await getListData(item.id, option)
      arreglo.push({ title: item.name, data });
    }
    return { list: arreglo, status: 200 };
  } catch (err) {
    return { list: null, status: 500, error: err };
  }
}






const getList = async (dataId) => {
  console.log("solocita el dataId:", dataId)
  const data = await Data.findOne({ where: { id: dataId } });
  let products = data.product;
  const list = products.split(',');
  const arreglo = []
  for (const item of list) {
    let dataDetails = await getDataDetailsByDataByYear(dataId, item)
    arreglo.push({ title: item, data: dataDetails });
  }
  return { list: arreglo, status: 200 };
}




///NO LO USO
const getDataDetailsByClientDate = async (clientId) => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  DataDetail.belongsTo(Data, { foreignKey: 'dataId' })
  Data.hasMany(DataDetail, { foreignKey: 'dataId' })
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
          where: { xValue: { [Op.between]: [startDate, endDate] } }
        }
      ],
      attributes: ['id', 'name'],
      where: { clientId },
      order: [
        [{ model: DataDetail }, 'time', 'ASC']
      ]
    });

    return { list: list, status: 200 };
  } catch (err) {
    console.log(err)
    return { list: null, status: 500, error: err };
  }

}




///METODO LOCAL QUE SIRVE PARA TRAER LOS DIFERENTES DATA Y OBTENER SU DATADETAIL
const getListData = async (dataId, option) => {
  console.log("solocita el dataId:", dataId)
  const data = await Data.findOne({ where: { id: dataId } });
  let products = data.product;
  const list = products.split(',');
  const arreglo = []
  for (const item of list) {
    console.log("option::::" + option)
    if (option == "YEAR") {
      let dataDetails = await getDataDetailsByDataByYear(dataId, item)
      arreglo.push({ title: item, data: dataDetails });
    }
    else if (option == "MONTH") {
      let dataDetails = await getDataDetailsByDataByMonth(dataId, item)
      arreglo.push({ title: item, data: dataDetails });
    }
    else {
      let dataDetails = await getDataDetailsByData(dataId, item)
      arreglo.push({ title: item, data: dataDetails });
    }

  }
  return arreglo;
}


///METODO LOCAL QUE RETORNA EL DATADETAIL POR CADA DATA
const getDataDetailsByData = async (dataId, product) => {
  console.log("ENTRO POR EL DIARIO")
  try {
    const list = await DataDetail.findAll({
      attributes: [
        ['xValue', 'time'],
        ['yValue', 'value']
      ],
      where: { dataId, name: product },
      order: [['time', 'ASC']]
    }
    );
    return list;
  } catch (err) {
    return null;
  }
}



///METODO LOCAL QUE RETORNA EL DATADETAIL POR CADA DATA BY YEAR
const getDataDetailsByDataByYear = async (dataId, product) => {
  console.log("ingreso por YEAR...", dataId)
  try {
    const list = await DataDetail.findAll({
      attributes: [
        [Sequelize.fn('YEAR', Sequelize.col('xValue')), 'time'],
        [Sequelize.fn('SUM', Sequelize.col('yValue')), 'value'],
      ],
      group: [Sequelize.fn('YEAR', Sequelize.col('xValue'))],
      where: { dataId, name: product },
      order: [['time', 'ASC']]
    }
    );

    //console.log(list)

    return list;
  } catch (err) {
    return null;
  }
}




///METODO LOCAL QUE RETORNA EL DATADETAIL POR CADA DATA POR MES
const getDataDetailsByDataByMonth = async (dataId, product) => {
  console.log("ENTRO POR EL MENSUAL")
  try {
    const list = await DataDetail.findAll({
      attributes: [
        [Sequelize.literal("CONCAT(YEAR(xValue), '-', LPAD(MONTH(xValue), 2, '0'), '-01')"), 'time'],
        [Sequelize.fn('SUM', Sequelize.col('yValue')), 'value'],
      ],
      group: [Sequelize.literal("CONCAT(YEAR(xValue), '-', LPAD(MONTH(xValue), 2, '0'), '-01')"), 'time'],
      where: { dataId, name: product },
      order: [['time', 'ASC']]
    }
    );
    return list;
  } catch (err) {
    console.log("Existio un error:", err)
    return null;
  }
}





export default {
  getList,
  getDataDetailsByClient,
  getDataDetailsByClientDate
};