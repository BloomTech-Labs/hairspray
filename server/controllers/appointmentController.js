require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.js");
var settings = require("../config/settings");
const Appointment = require("../models/Appointment.js");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const myNumber = process.env.MY_NUMBER;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

// testing function to see all Appointments
const getAllAppointments = (req, res) => {
	Appointment.find({})
	.populate({ path: "user", select: "name email phone" })
	.populate({ path: "stylist", select: "name email" })
	.populate('service')
	.then(appt => {
			res.status(200).json({
				success: "Appointments found",
				appt
			});
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

const getAppointment = (req, res) => {
	const { apptID } = req.params;
	Appointment.findById({ apptID })
	.populate({ path: "user", select: "name email phone" })
	.populate({ path: "stylist", select: "name email" })
	.populate('service')
	.then(appt => {
			res.status(200).json({
				success: "Appointment found",
				appt
			});
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to create a new appointment and save to database
// user id should be passed in through :id params
// must pass in a stylist and date in format "2018-08-22T12:12:12.764Z"
// Will hook up user's number when closer to production build
const createAppointment = (req, res) => {
	const user = req.params.id;
	const { stylist, session, service } = req.body;
	console.log(req.body);
	const appointment = new Appointment({
		user,
		stylist: stylist._id,
		session,
		service
	});
	appointment
		.save()
		.then(appt => {
			// This trims the date and time to send to the user through text
			let apptDay = session.slice(5, 7) + "/" + session.slice(8, 10);
			let apptTime = session.slice(11, 16);
			if (Number(apptTime.slice(0, 2)) > 12)
				apptTime =
					apptTime.replace(
						apptTime.slice(0, 2),
						Number(apptTime.slice(0, 2)) - 12
					) + " PM";
			else apptTime += " AM";

			// Twilio integration
			// send text here
			// client.messages
			// 	.create({
			// 		body: `Your appointment with ${
			// 			stylist.name
			// 		} on ${apptDay} at ${apptTime} has been scheduled!`,
			// 		to: myNumber, // Number to send text to. Put your number here to test
			// 		from: twilioNumber // From a valid Twilio number
			// 	})
			// 	.then(message => console.log(message.sid))
			// 	.catch(err => console.log(err));

			res.status(200).json({
				success: "Appointment saved",
				appt
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send({ error: err });
		});
};

// function to get appointments for a User, specified by their id
// user id should be passed in through :id params
const getUserAppointments = (req, res) => {
	const userID = req.params.id;
	Appointment.find({ user: userID })
		.populate({ path: "user", select: "name" })
		.populate({ path: "stylist", select: "name" })
		.then(appt => {
			if (appt.length === 0) {
				res.json({ success: "There are no Appointments for this User" });
			} else {
				res.status(200).json({
					success: "Appointment found",
					appt
				});
			}
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to get appointments for a Stylist, specified by their id
// user id should be passed in through :id params
const getStylistAppointments = (req, res) => {
	const stylistID = req.params.id;
	Appointment.find({ stylist: stylistID })
		.populate({ path: "user", select: "name" })
		.populate({ path: "stylist", select: "name" })
		.then(appt => {
			res.status(200).json({
				success: "Appointment found",
				appt
			});
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to update a single appointment by its ID
// appointment id should be passed in through :id params
// must pass in a user _id, stylist _id, and a date in format "2018-08-22T12:12:12.764Z"
const updateAppointment = (req, res) => {
	const { id } = req.params;
	const { user, stylist, session, service } = req.body;
	Appointment.findByIdAndUpdate(id, req.body, { new: true })
		.then(appt => {
			if (appt === null) {
				res.json({ error: "That Appointment does not exist" });
			} else {
				res.status(200).json({
					success: "Appointment updated successfully",
					appt
				});
			}
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to delete an appointment by its id
// appointment id should be passed in through :id params
const deleteAppointment = (req, res) => {
	const { id } = req.params;
	Appointment.findByIdAndRemove(id)
		.then(deleted => {
			if (deleted === null) {
				res.status(404).json({ error: "Appointment not found" });
			} else {
				res.status(200).json({
					success: "Deleted successfully"
				});
			}
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

module.exports = {
	POST: createAppointment,
	GET: getAllAppointments,
	GET_ONE: getAppointment,
	PUT: updateAppointment,
	DELETE: deleteAppointment,
	USER_GET: getUserAppointments,
	STYLIST_GET: getStylistAppointments
};
