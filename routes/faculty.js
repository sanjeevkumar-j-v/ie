var express = require("express");
var router = express.Router();
var Participation = require("../models/participation");
var User = require("../models/user");
var College = require("../models/college");

router.get("/", async function (req, res) {
  var participations = await Participation.find({}).sort({
    dates: 1,
    createdAt: 1,
  });
  var allRequests = [];
  for (i in participations) {
    var request = {};
    request.student = await User.findById(participations[i].userId);
    request.college = await College.findById(participations[i].collegeId);
    request._id = participations[i]._id;
    request.eventname = participations[i].eventname;
    request.eventtype = participations[i].eventtype;
    request.description = participations[i].description;
    request.dates = participations[i].dates;
    request.applicationStatus = participations[i].applicationStatus;
    request.proofOfParticipation = participations[i].proofOfParticipation;

    allRequests.push(request);
  }
  return res.render("faculty", { allRequests });
});
router.get("/view/:participationId", async function (req, res) {
  var participation = await Participation.findById(req.params.participationId);
  var request = {};
  request.student = await User.findById(participation.userId);
  request.college = await College.findById(participation.collegeId);
  request._id = participation._id;
  request.eventname = participation.eventname;
  request.eventtype = participation.eventtype;
  request.description = participation.description;
  request.fromDate = participation.fromDate;
  request.toDate = participation.toDate;
  request.applicationStatus = participation.applicationStatus;
  request.proofOfParticipation = participation.proofOfParticipation;

  return res.render("singlerequest", { request });
});
router.get("/approve/:participationId", function (req, res) {
  Participation.findByIdAndUpdate(
    req.params.participationId,
    { applicationStatus: "approved" },
    function (err, participation) {
      if (err) {
        console.log("Error on approving request: ", err);
      }
      if (participation) {
        console.log("Approved: ", participation);
        return res.redirect("/faculty");
      }
    }
  );
});
router.get("/reject/:participationId", function (req, res) {
  Participation.findByIdAndUpdate(
    req.params.participationId,
    { applicationStatus: "rejected" },
    function (err, participation) {
      if (err) {
        console.log("Error on approving request: ", err);
      }
      if (participation) {
        console.log("Rejected: ", participation);
        return res.redirect("/faculty");
      }
    }
  );
});

module.exports = router;
