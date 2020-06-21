var express = require('express');
var router = express.Router();
var loginService = require('../src/service/auth');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  console.log(req.body)
  return res.json(await loginService.checkUserAndPassInDb(req.body.username, req.body.password));
});

router.get('/logout', (req, res, nest) => {

});

module.exports = router;