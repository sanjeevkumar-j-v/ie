const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userid: {
      // Student Admission number or Faculty ID
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
    },
    // for student role
    roll_number: {
      type: String,
    },
    batch: {
      type: String,
    },
    program: {
      // Department & course
      type: String,
    },
    // for faculty role
    designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;