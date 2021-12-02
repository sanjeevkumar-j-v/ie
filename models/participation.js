const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
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