const httpError = require("http-errors");
const { AccountTypeProvider } = require("../../providers/account-type");
const { AccountsProvider } = require("../../providers/accounts");
const { responseMessages } = require("../../actions/helper/responseMessages");
const { statusCodes } = require("../helper/statusCodes");

class AccountTransfer {
  constructor(account_details) {
    this.from_account_id = account_details.fromAccountId, 
    this.to_account_id = account_details.toAccountId;
    this.amount = account_details.amount;
  }
  async execute() {
    try {
      // Fetch account details
      const account_details = await AccountsProvider.fetchAccountDetails(this.from_account_id, this.to_account_id);
      // Validate account-Id
      if (account_details.length < 2) {
        throw new httpError(statusCodes.NOT_FOUND, responseMessages.INVALID_ACCOUNT_ID);
      }

      // Extract account details
      const { from_account_details, to_account_details } = this.extractAccountDetails(account_details, this.from_account_id);
      // Validate amount in source account
      if (from_account_details.amount < (this.amount / 100)){
        throw new httpError(statusCodes.BAD_REQUEST, responseMessages.INSUFFICIENT_FUNDS);
      }
      
      // Validate customer-Id
      if (from_account_details.customer_id === to_account_details.customer_id) {
        throw new httpError(statusCodes.FORBIDDEN, responseMessages.INVALID_TRANSFER);
      }

      // Validate amount in destination account for type basic savings
      const type_details = await AccountTypeProvider.fetchAccountTypeDetails(to_account_details.account_type);
      if (type_details && Object.keys(type_details).length && (to_account_details.amount + (this.amount / 100)) > 50000) {
        throw new httpError(statusCodes.FORBIDDEN, responseMessages.BASIC_SAVINGS_LIMIT);
      }

      // Update amount
      const updated_src_amount = from_account_details.amount - (this.amount / 100 );
      const updated_dest_amount = to_account_details.amount + (this.amount / 100);
      const updated_at = new Date();
      const account_result = await Promise.all([
      AccountsProvider.updateAccountDetails(updated_src_amount, this.from_account_id, updated_at), 
      AccountsProvider.updateAccountDetails(updated_dest_amount, this.to_account_id, updated_at)]);

      // Formulate and return response
      return this.formulateResponse(to_account_details.customer_id, from_account_details.amount, this.amount, updated_at);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  extractAccountDetails(account_details, from_account_id) {
    try {
      let from_account_details = {}; 
      let to_account_details = {};
      account_details.map(data => {
        const details = data.dataValues
        if (details.id === from_account_id) from_account_details = details;
        else to_account_details = details;
      })
      return { from_account_details, to_account_details };
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async formulateResponse(customer_id, source_amount, amount, updated_at) {
    try {
      const dest_account_details = await AccountsProvider.fetchDetailsByCustomerId(customer_id)
      let totalDestBalance = 0;
      dest_account_details.map(data => {
        const account_data = data.dataValues;
        totalDestBalance += account_data.amount
      })
      totalDestBalance = totalDestBalance * 100
      let newSrcBalance = source_amount - (amount / 100)
      newSrcBalance = newSrcBalance * 100;
      let transferredAt = updated_at;
      return { newSrcBalance, totalDestBalance, transferredAt }
    } catch(error) {
      console.log(error);
      throw error;
    }
  }
}

exports.AccountTransfer = AccountTransfer;
