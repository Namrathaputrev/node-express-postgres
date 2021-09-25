const { DataTypes } = require('sequelize');
const { sequelize } = require('../db-config/db-connector');

const AccountType = sequelize.define('account_type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'account_type',
    sequelize,
  },
);
AccountType.sync({ force: false }).then(() => console.log('Connected to table - account_type'));

module.exports = {
  AccountType
}