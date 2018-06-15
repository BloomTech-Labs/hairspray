const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = Schema({
  // The user the Appointment belongs to
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // The Stylist for the Appointment
  stylist: {
    type: Schema.Types.ObjectId,
    ref: "Stylist",
    required: true
  },
  // The date and time for the Appointment
  session: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
