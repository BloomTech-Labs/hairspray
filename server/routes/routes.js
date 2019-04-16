/* eslint-disable */

// const userControllerStrategy = require("../controllers/userController");
// shortened var name for cleaner looking code, but we can revert if you like
const users = require("../controllers/userController");
const stylists = require("../controllers/stylistController");
const appointments = require("../controllers/appointmentController");
const feedback = require("../controllers/feedbackController");
const service = require("../controllers/serviceController");

const express = require("express");
const { validateToken } = require("../config/auth");

module.exports = app => {
  // USERS FUNCTIONS
  app
    .route("/api/signup")
    .post(users.createUser) // create a new User
    .get(users.getUsers); // testing route to get all users in database
  // .get(validateToken, getUsers); // commented out for now, just to test easier in postman
  app.route("/api/login").post(users.userLogin); // login a user and return a JWT
  app
    .route("/api/users/:id")
    .put(validateToken, users.updateUser)
    .get(users.getUser); // get a specific User
  app.route("/api/charge").post(validateToken, users.createCharge);
  // TODO: DELETE to erase user

  //Admin routes
  app.route("/api/users").get(validateToken, users.getUsers); // checks if user is an Admin, then gives priveledge to view all users

  // STYLISTS FUNCTIONS
  app
    .route("/api/stylist/")
    .get(stylists.GET) // testing route to get a list of all stylists in database
    .post(stylists.POST); // create a new stylist

  app
    .route("/api/stylist/:id")
    .get(stylists.STYLIST_GET) // get a stylist by their id
    .put(stylists.PUT) // updates Stylist by Stylist ID
    .delete(stylists.DELETE); // deletes Stylist by Stylist ID

  // APPOINTMENTS FUNCTIONS
  app.route("/api/appointments").get(appointments.GET); //testing route to get all appointments in database
  app.route("/api/date/stylist/appointments").post(appointments.SEARCHBY_DATE_STYLIST);
  app.route("/api/appointments/date").post(appointments.SEARCHBY_DATE); // all appointments by specific date
  app.route("/api/appointments/:id").get(appointments.GET_ONE); //get a specific Appointment

  app
    .route("/api/user/:id/appointments")
    .post(appointments.POST) // create a new Appointment
    .get(appointments.USER_GET); // list all Appointments for specific User

  app.route("/api/stylist/:id/appointments").get(appointments.STYLIST_GET); // list all Appointments for specific Stylist

  app
    .route("/api/appointments/update/:id")
    .put(appointments.PUT) // updates Appointment by Appointment ID
    .delete(appointments.DELETE); // deletes Appointment by Appointment ID

  // FEEDBACK FUNCTIONS
  app.route("/api/feedback").get(feedback.GET); // testing route to get all feedback in database

  app.route("/api/appointment/:id/feedback").post(feedback.POST); // create a new Feedback

  app.route("/api/user/:id/feedback").get(feedback.USER_GET); // list all Feedback for specific User

  app.route("/api/stylist/:id/feedback").get(feedback.STYLIST_GET); // list all Feedback for specific Stylist
  app
    .route("/api/feedback/update/:id")
    .put(feedback.PUT) // updates Feedback by Feedback ID
    .delete(feedback.DELETE); // deletes Feedback by Feedback ID

  // SERVICES FUNCTIONS
  app
    .route("/api/service")
    .get(service.GET) // testing route to get all Services in database
    .post(service.POST); // create a new Service

  app.route("/api/service/:id").get(service.SERVICE_GET); // Get specific Service
  app
    .route("/api/service/update/:id")
    .put(service.PUT) // updates Service by Service ID
    .delete(service.DELETE); // deletes Service by Service ID
};
//Routes
