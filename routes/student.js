var express = require("express");
var router = express.Router();
var Participation = require("../models/participation");
var College = require("../models/college");

router.get("/", function (req, res) {
  return res.render("student");
});
router.get("/request-participation", async function (req, res) {
  var colleges = await College.find({}).sort({ collegename: 1 });
  return res.render("requestparticipation", { colleges });
});
router.post("/request-participation", function (req, res) {

  College.find({collegename: req.body.collegename}, function (err, colleges) {
    console.log(colleges);
    req.body.userId = req.user._id;
    req.body.collegeId = colleges[0]._id;
    req.body.applicationStatus = "pending";
    var dates = [];
    dates.push(req.body.date1);
    if (req.body.date2) dates.push(req.body.date2);
    if (req.body.date3) dates.push(req.body.date3);
    req.body.dates = dates;
    Participation.create(req.body, function (err, participation) {
      if (err) {
        console.log("Error in requesting participation: ", err);
        return;
      }
      console.log("Participation: ", participation);
      return res.redirect("/student/activities");
    });
  });
});
router.get("/activities", function (req, res, next) {
  Participation.find({ userId: req.user._id }, function (err, participations) {
    return res.render("activities", { participations });
  });
});
module.exports = router;
