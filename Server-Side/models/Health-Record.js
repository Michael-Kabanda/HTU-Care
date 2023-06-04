const mongoose = require("mongoose");

// Define the health record schema
const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facility: {
    type: String,
    required: true,
  },
  healthProvider: {
    type: String,
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create the health record model
const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

module.exports = HealthRecord;
