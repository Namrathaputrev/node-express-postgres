const Joi = require('Joi');

const accountSchema = Joi.object({
    fromAccountId: Joi.number().required(),
    toAccountId: Joi.number().required(),
    amount: Joi.number().required()
});

module.exports = {
    accountSchema
}