const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const FeedbackSchema = Schema({
  // The user the Feedback belongs to
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
    unique: true,
  },
  consultation: {
    type: String
  },
  consultationScore: {
    type: Number,
    required: true
  },
  ontime: {
    type: String
  },
  ontimeScore: {
    type: Number,
    required: true
  },
  styling: {
    type: String
  },
  stylingScore: {
    type: Number,
    required: true
  },
  customerservice: {
    type: String
  },
  customerserviceScore: {
    type: Number,
    required: true
  },
  overall: {
    type: String
  },
  overallScore: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
