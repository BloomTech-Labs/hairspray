const mongoose = require("mongoose");
const User = require("../models/User.js");
var settings = require("../config/settings");
const Appointment = require("../models/Appointment.js");


// endpoint to create a new appointment and save to database
const createAppointment = (req, res) => {
  const { user, stylist, session } = req.body;
  const appointment = new Appointment({ user, stylist, session });
  appointment.save((err, appt) => {
    if (err) return res.send(err);
    res.json({
      success: "Appointment saved",
      appt
    });
  });
}


// endpoint to get appointments for a user, specified by their id
const getAppointments = (req, res) => {
  const { user } = req.params;
  Appointment.find(user)
  .populate({path: "user", select: "name" })
  .populate({path: "stylist", select: "name" })
  .then(appt => {
    res.json(appt);
  })
  .catch(err => {
    res.json(err);
  })
  ; 
}

module.exports = {
  createAppointment,
  getAppointments
}