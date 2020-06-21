var express = require('express');
var router = express.Router();
var dateUtil = require('../src/util/dateUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    now: dateUtil.getDateToNumber(dateUtil.now()),
    firstDate: dateUtil.getDateToString(dateUtil.getFirstDateOfMonth()),
    endDate: dateUtil.getDateToString(dateUtil.getEndDateOfMonth()),
    firstDateOfYear: dateUtil.getFirstDateOfYear(),
    endDateOfYear: dateUtil.getEndDateOfYear()
  });
})

module.exports = router;
