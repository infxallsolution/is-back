import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()
 
const DataDetails = sequelize.define('dataDetails', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  dataId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  xValue: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  yValue: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'dataDetails'
});

DataDetails.sync();
export default DataDetails;