//Kullanıcı nesnesinin modeli
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

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  username: {
    type: DataTypes.CHAR(10),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR(10),
    allowNull: false,
  },
  accountCreateDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userType: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false, 
  tableName: 'Users'
});

module.exports = User;
