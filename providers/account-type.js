const { AccountType } = require('../models/account-type');

class AccountTypeProvider {
  static async fetchAccountTypeDetails(type_id) {
    const result = await AccountType.findOne({
      where: {
        id: type_id,
        type: 'basicSavings'
      }
    });
    return result;
  }
}

exports.AccountTypeProvider = AccountTypeProvider;