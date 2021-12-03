const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    // eventId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Event",
    //   required: true,
    // },
    eventname: {
      type: String,
      required: true,
    },
    eventtype: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    applicationStatus: {
      type: String,
    },
    proofOfParticipation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Participation = mongoose.model("Participation", participationSchema);

module.exports = Participation;