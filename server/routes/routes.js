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
	app
		.route("/signup")
		.post(users.createUser) // create a new User
		.get(getUsers); //testing route to get all users in database
		// .get(validateToken, getUsers); // commented out for now, just to test easier in postman
	app.route("/login").post(users.userLogin);

	app.route("/users/:id").get(users.getUser); // get a specific User
  app.route("/users/:id").put(users.updateUser); // update User's information
	// TODO: DELETE to erase user
  
  app
    .route("/user/:id/appointments")
    .get(appointments.getAppointments) // list all appointments for specific user
    .post(appointments.createAppointment); // create a new Appointment
	// TODO: PUT to change an appointment's details
  app.route("/appointments/update/:id").put(appointments.updateAppointment); // deletes appointment by appointment ID
  app.route("/appointments/remove/:id").delete(appointments.deleteAppointment); // deletes appointment by appointment ID

	app
		.route("/stylists/")
		.get(stylists.getAllStylists) // testing route to get a list of all stylists in database
		.post(stylists.createStylist); // create a new stylist
  app.route("/stylist/:id").get(stylists.getStylist); // get a stylist by their id
  // TODO: PUT to change an stylist's details
	// TODO: DELETE to erase stylist
};
