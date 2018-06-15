/* eslint-disable */

// const userControllerStrategy = require("../controllers/userController");
// shortened var name for cleaner looking code, but we can revert if you like
const users = require("../controllers/userController");
const appointments = require("../controllers/appointmentController");
const stylists = require("../controllers/stylistController");

const express = require("express");
const { validateToken } = require("../config/auth");
const { getUsers } = require("../controllers/userController");

module.exports = app => {
	// USERS FUNCTIONS
	app
		.route("/signup")
		.post(users.createUser) // create a new User
		.get(getUsers); // testing route to get all users in database
	// .get(validateToken, getUsers); // commented out for now, just to test easier in postman
	app.route("/login").post(users.userLogin); // login a user and return a JWT

	app
		.route("/users/:id")
		.get(users.getUser) // get a specific User
		.put(users.updateUser); // update User's information
	// TODO: DELETE to erase user

	// STYLISTS FUNCTIONS
	app
		.route("/stylist/")
		.get(stylists.GET) // testing route to get a list of all stylists in database
		.post(stylists.POST); // create a new stylist
	app
		.route("/stylist/:id")
		.get(stylists.STYLIST_GET) // get a stylist by their id
		.put(stylists.PUT) // updates Stylist by Stylist ID
		.delete(stylists.DELETE); // deletes Stylist by Stylist ID

	// APPOINTMENTS FUNCTIONS
	app.route("/appointments").get(appointments.GET); //testing route to get all appointments in database
	app
		.route("/user/:id/appointments")
		.post(appointments.POST) // create a new Appointment
		.get(appointments.USER_GET); // list all Appointments for specific User
	app.route("/stylist/:id/appointments").get(appointments.STYLIST_GET); // list all Appointments for specific Stylist
	app
		.route("/appointments/update/:id")
		.put(appointments.PUT) // updates Appointment by Appointment ID
		.delete(appointments.DELETE); // deletes Appointment by Appointment ID
};
