var express = require('express');
var expenseService = require('../src/service/expense');
var router = express.Router();

router.post('/saveExpense', async (req, res, next) => {
    console.log(req.body);
    const result = await expenseService.saveExpense(req.body);
  return res.status(result.status).json(result);
});

module.exports = router;