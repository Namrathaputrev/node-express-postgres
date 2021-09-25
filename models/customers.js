const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db-config/db-connector');

const Customers = sequelize.define('Customers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'customers',
    sequelize,
  },
);
Customers.sync({ force: false }).then(() => console.log('Connected to table - customers'));

module.exports = {
  Customers
}