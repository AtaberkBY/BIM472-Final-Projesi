const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('GHDB', 'sa', '123456', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    },
  },
});

const News = sequelize.define('News',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    detail:{
        type:DataTypes.STRING(500),
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    imageData:{
      type:DataTypes.BLOB('long')
    }
},{
    timestamps:false,
    tableName: 'News'
});

module.exports = News;