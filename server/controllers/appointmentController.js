const mongoose = require("mongoose");
const User = require("../models/User.js");
var settings = require("../config/settings");
const Appointment = require("../models/Appointment.js");

// function to create a new appointment and save to database
// must pass in a user, stylist, and date in format "2018-08-22T12:12:12.764Z"
const createAppointment = (req, res) => {
	const { user, stylist, session } = req.body;
	const appointment = new Appointment({ user, stylist, session });
	appointment.save((err, appt) => {
		if (err) res.status(400).send({ error: err });
		res.status(200).json({
			success: "Appointment saved",
			appt
		});
	});
};

// function to get appointments for a user, specified by their id
const getAppointments = (req, res) => {
	const { userID } = req.params;
	Appointment.find(userID)
		.populate({ path: "user", select: "name" })
		.populate({ path: "stylist", select: "name" })
		.then(appt => {
			res.status(200).json({
				success: "Appointment found",
				appt
			});
		})
		.catch(err => {
			res.status(200).json({ error: err });
		});
};

// function to update a single appointment by its ID
// must pass in a user _id, stylist _id, and a date in format "2018-08-22T12:12:12.764Z"
const updateAppointment = (req, res) => {
	const { id } = req.params;
	const { user, stylist, session } = req.body;
	Appointment.findByIdAndUpdate(id, req.body, { new: true }).exec(
		(err, appt) => {
			if (err) {
				res.status(404).json({ error: "Could not find that appt" });
			}
			res.status(200).json({
				success: "Appointment updated successfully",
				appt
			});
		}
	);
};

// function to delete an appointment by its id
const deleteAppointment = (req, res) => {
	const { id } = req.params;
	Appointment.findByIdAndRemove(id)
		.then(deleted => {
			if (deleted === null) {
				res.status(404).json({ error: "Appointment not found" });
			}
			res.status(200).json({
				success: "Deleted successfully"
			});
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

module.exports = {
	createAppointment,
	getAppointments,
	updateAppointment,
	deleteAppointment
};
