var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return res.render("faculty");
});
router.post('/approve/:participationId', function(req, res) {
  return res.render("faculty");
});
router.post('/reject/:participationId', function(req, res) {
  return res.render("faculty");
});

module.exports = router;
