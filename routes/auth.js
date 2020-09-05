var express = require('express');
var router = express.Router();
var authService = require('../src/service/auth');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const jsonData = await authService.checkUserAndPassInDb(req.body.username, req.body.password);
  return res.status(jsonData.status).json(jsonData);
});

router.get('/logout', (req, res, next) => {
  // authService.getUserProfile();
  return res.json(authService.getUserProfile());
});

module.exports = router;