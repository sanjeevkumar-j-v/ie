var express = require('express');
var router = express.Router();
var Participation = require('../models/participation');
var College = require('../models/college');

router.get('/', function(req, res) {
  return res.render("student");
});
router.get('/request-participation', function(req, res) {
  return res.render("requestparticipation");
});
router.post('/request-participation', function(req, res) {
  College.create(req.body, function(err, college) {
    req.body.userId = req.user._id;
    req.body.collegeId = college._id;
    req.body.applicationStatus = "pending";
    Participation.create(req.body, function(err, participation){
      if(err){console.log('Error in requesting participation: ', err); return;}
      console.log("Participation: ", participation);
      return res.redirect('/student/activities');
    });
  });
});
router.get('/activities', function(req, res, next) {
  Participation.find({userId: req.user._id}, function(err, participations) {
    return res.render("activities", {participations});
  });
});
module.exports = router;
