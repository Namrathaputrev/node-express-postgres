const { DataTypes } = require('sequelize');
const { sequelize } = require('../db-config/db-connector');

const Accounts = sequelize.define('accounts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    account_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    tableName: 'accounts',
    sequelize,
  },
);
Accounts.sync({ force: false }).then(() => console.log('Connected to table - accounts'));

module.exports = {
  Accounts
}