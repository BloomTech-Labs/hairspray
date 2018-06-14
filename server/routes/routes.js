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

	// APPOINTMENTS FUNCTIONS
	app
		.route("/user/:id/appointments")
		.post(appointments.POST) // create a new Appointment
		.get(appointments.GET); // list all appointments for specific user
	app
		.route("/appointments/update/:id")
		.put(appointments.PUT) // updates appointment by appointment ID
		.delete(appointments.DELETE); // deletes appointment by appointment ID

	// STYLISTS FUNCTIONS
	app
		.route("/stylists/")
		.get(stylists.getAllStylists) // testing route to get a list of all stylists in database
		.post(stylists.createStylist); // create a new stylist
	app.route("/stylist/:id").get(stylists.getStylist); // get a stylist by their id
	// TODO: PUT to change an stylist's details
	// TODO: DELETE to erase stylist
};
