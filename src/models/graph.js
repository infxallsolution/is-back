import { DataTypes } from 'sequelize';
import conectDb from '../config/db.js'
const sequelize = conectDb()

const variable = 0

/*
  Tipo de grafico
  - torta 
  - barras
  - lines




*/

 
const Graph = sequelize.define('graphs', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'graphs'
});

Graph.sync();
export default Graph;