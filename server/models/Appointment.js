const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stylist: {
    type: Schema.Types.ObjectId,
    ref: 'Stylist',
    required: true
  },
  session: {
    type: Date,
    required: true,
    unique: true
  },
  service: [{ type: Schema.Types.ObjectId, ref: 'Service', required: true }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
