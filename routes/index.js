var express = require('express');
var dateUtil = require('../src/util/dateUtil');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testConvertDate', function(req, res, next) {
  res.json(dateUtil.convertMilliToTimeLeftString(90005555));
});

module.exports = router;
