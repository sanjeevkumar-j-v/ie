const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
    },
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;