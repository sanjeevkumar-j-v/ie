const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const PROOF_PATH = path.join("/uploads/proofs/");

const participationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // collegeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "College",
  //   required: true,
  // },
  // eventId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Event",
  //   required: true,
  // },
  collegename: {
    type: String,
    required: true,
  },
  eventname: {
    type: String,
    required: true,
  },
  eventlevel: {
    type: String,
    required: true,
  },
  eventtype: {
    type: String,
    required: true,
  },
  topicname: {
    type: String,
  },
  dates: [{
    type: Date,
  },],
  applicationStatus: {
    type: String,
  },
  proofOfParticipation: {
    type: String,
  },
  proofStatus: {
    type: String,
  },
}, {
  timestamps: true,
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", PROOF_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      path.extname(file.originalname)
    );
  },
});

// static methods
participationSchema.statics.uploadedProof = multer({
  storage: storage
}).single(
  "proofOfParticipation"
);
participationSchema.statics.proofPath = PROOF_PATH;

const Participation = mongoose.model("Participation", participationSchema);

module.exports = Participation;