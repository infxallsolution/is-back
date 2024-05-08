import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()

const variable = 0

 
const Data = sequelize.define('data', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  tableName: 'data'
});

Data.sync();
export default Data;