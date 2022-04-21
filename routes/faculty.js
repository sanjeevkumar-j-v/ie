var express = require("express");
var router = express.Router();
var Participation = require("../models/participation");
var User = require("../models/user");
var College = require("../models/college");

router.get("/", async function (req, res) {
  var participations = await Participation.find({}).sort({
    dates: -1,
    createdAt: 1,
  });
  for (participation of participations) {
    participation.student = await User.findById(participation.userId);
  }
  return res.render("faculty", {
    allRequests: participations
  });
});
router.get("/view/:participationId", async function (req, res) {
  var participation = await Participation.findById(req.params.participationId);
  participation.student = await User.findById(participation.userId);
  return res.render("singlerequest", {
    request: participation
  });
});
router.get("/approve/:participationId", function (req, res) {
  Participation.findByIdAndUpdate(
    req.params.participationId, {
      applicationStatus: "approved"
    },
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
    req.params.participationId, {
      applicationStatus: "rejected"
    },
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
router.get("/accept-proof/:participationId", function (req, res) {
  Participation.findByIdAndUpdate(
    req.params.participationId, {
      proofStatus: "accepted"
    },
    function (err, participation) {
      if (err) {
        console.log("Error on accepting proof: ", err);
      }
      if (participation) {
        console.log("Approved: ", participation);
        return res.redirect("/faculty/view/" + req.params.participationId);
      }
    }
  );
});
router.get("/reject-proof/:participationId", function (req, res) {
  Participation.findByIdAndUpdate(
    req.params.participationId, {
      proofStatus: "rejected"
    },
    function (err, participation) {
      if (err) {
        console.log("Error on rejecting proof: ", err);
      }
      if (participation) {
        console.log("Rejected: ", participation);
        return res.redirect("/faculty");
      }
    }
  );
});

module.exports = router;