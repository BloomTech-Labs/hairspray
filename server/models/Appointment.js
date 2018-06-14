const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const AppointmentSchema = Schema({
  // The user the Appointment belongs to
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // The Stylist for the Appointment
  stylist: {
    type: Schema.Types.ObjectId,
    ref: "Stylist",
  },
  // The date and time for the Appointment
  date_slot: {
    type: Date,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
