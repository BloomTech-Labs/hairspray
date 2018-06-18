/* eslint-disable */

// const userControllerStrategy = require("../controllers/userController");
// shortened var name for cleaner looking code, but we can revert if you like
const users = require("../controllers/userController");
const stylists = require("../controllers/stylistController");
const appointments = require("../controllers/appointmentController");
const feedback = require("../controllers/feedbackController");

const express = require("express");
const { validateToken } = require("../config/auth");

module.exports = app => {
  // USERS FUNCTIONS
  app.route("/signup").post(users.createUser); // create a new User
  //.get(getUsers); // testing route to get all users in database
  app.route("/login").post(users.userLogin); // login a user and return a JWT
  // .get(validateToken, getUsers); // commented out for now, just to test easier in postman
  app.route("/users/:id").put(validateToken, users.updateUser);

  app.route("/users/:id").get(users.getUser); // get a specific User
  // TODO: DELETE to erase user
  app.route("/charge").post(validateToken, users.createCharge);
  app.route("/stripeuser").post(validateToken, users.createCustomer);

  //Admin routes
  app.route("/users").get(validateToken, users.getUsers); // checks if user is an Admin, then gives priveledge to view all users

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

  // FEEDBACK FUNCTIONS
  app.route("/feedback").get(feedback.GET); // testing route to get all feedback in database

  app.route("/appointment/:id/feedback").post(feedback.POST); // create a new Feedback

  app.route("/user/:id/feedback").get(feedback.USER_GET); // list all Feedback for specific User

  app.route("/stylist/:id/feedback").get(feedback.STYLIST_GET); // list all Feedback for specific Stylist
  app
    .route("/feedback/update/:id")
    .put(feedback.PUT) // updates Feedback by Feedback ID
    .delete(feedback.DELETE); // deletes Feedback by Feedback ID
};
