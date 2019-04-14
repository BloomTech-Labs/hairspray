const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = Schema({
  // The user the Feedback belongs to
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
    unique: true
  },
  consultation: {
    feedback: { type: String, required: true },
    score: { type: Number, required: true }
  },
  ontime: {
    feedback: { type: String, required: true },
    score: { type: Number, required: true }
  },
  styling: {
    feedback: { type: String, required: true },
    score: { type: Number, required: true }
  },
  customer_service: {
    feedback: { type: String, required: true },
    score: { type: Number, required: true }
  },
  overall: {
    feedback: { type: String, required: true },
    score: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
