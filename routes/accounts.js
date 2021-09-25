const router = require("express").Router();
const { ActionManager } = require("../actions/action-manager");
const { AccountTransfer } = require("../actions/accounts/account-transfer");
const { accountSchema } = require("../routes/helper/request-validation");
const validator = require("express-joi-validation").createValidator({ parseError: true })

router.patch("/transfer", validator.body(accountSchema), (req, res, next) => {
  let account_details = req.body;
  let action = new AccountTransfer(account_details);
  ActionManager.execute(action)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(error.status).send({error: error.message});
    });
});
module.exports = router;
