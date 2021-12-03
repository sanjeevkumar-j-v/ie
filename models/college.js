const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegename: {
      type: String,
      required: true,
      unique: true
    },
    collegeaddress: {
      type: String,
    },
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;