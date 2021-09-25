const { Accounts } = require('../models/accounts');
const { Op } = require('sequelize');

class AccountsProvider {
  static async fetchAccountDetails(from_account_id, to_account_id) {
    const result = await Accounts.findAll({
      where: {
        id: { [Op.in] : [from_account_id, to_account_id] }
      }
    });
    return result;
  }

  static async updateAccountDetails(amount, to_account_id, updated_at) {
    const result = await Accounts.update({ amount, updated_at }, {
      where: {
        id: to_account_id
      }
    });
    return result;
  }

  static async fetchDetailsByCustomerId(customer_id) {
    const result = await Accounts.findAll({
      where: {
        customer_id
      }
    });
    return result;
  }
}

exports.AccountsProvider = AccountsProvider;