var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return res.render("student");
});
router.get('/request-participation', function(req, res) {
  return res.render("requestparticipation");
});
router.post('/request-participation', function(req, res) {
  return res.render("requestparticipation");
});
router.get('/activities', function(req, res, next) {
  return res.render("activities");
});
module.exports = router;
