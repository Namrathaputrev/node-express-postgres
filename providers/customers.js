const { Customers } = require('../models/customers');

class CustomerProvider {
  static async fetchCustomerDetails() {
    const result = await Customers.findOne({
      where: {
        id: 1
      }
    });
    return result;
  }
}

exports.CustomerProvider = CustomerProvider;