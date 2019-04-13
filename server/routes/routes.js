const users = require("../controllers/userController");
const stylists = require("../controllers/stylistController");
const appointments = require("../controllers/appointmentController");
const feedback = require("../controllers/feedbackController");
const service = require("../controllers/serviceController");
const { validateToken, getToken } = require("../config/auth");

module.exports = app => {

  app.route('/api/getToken').get((req, res) => res.send(getToken()));
  // login a user and return a JWT
  app.route("/api/login").post(users.userLogin); 
  app.route("/api/charge").post(validateToken, users.createCharge);
  //Admin routes
  // checks if user is an Admin, then gives priveledge to view all users
  app.route("/api/users").get(validateToken, users.getUsers); 

  // USERS
  app
    .route("/api/users")
    // create a new User
    .post(users.createUser) 
    // testing route to get all users in database
    .get(users.getUsers); 

  app
    .route("/api/users/:id")
    .put(validateToken, users.updateUser)
    // get a specific User
    .get(users.getUser); 
  // TODO: DELETE to erase user

  // STYLISTS
  app
    .route("/api/stylist")
    // testing route to get a list of all stylists in database
    .get(stylists.GET) 
    // create a new stylist
    .post(stylists.POST); 

  app
    .route("/api/stylist/:id")
    // get a stylist by their id
    .get(stylists.STYLIST_GET) 
    // updates Stylist by Stylist ID
    .put(stylists.PUT) 
    // deletes Stylist by Stylist ID
    .delete(stylists.DELETE); 

  // APPOINTMENTS
  app.route("/api/appointments").get(appointments.GET); //testing route to get all appointments in database
  app.route("/api/date/stylist/appointments").post(appointments.SEARCHBY_DATE_STYLIST);
  // all appointments by specific date
  app.route("/api/appointments/date").post(appointments.SEARCHBY_DATE); 
  app.route("/api/appointments/:id").get(appointments.GET_ONE); //get a specific Appointment

  app
    .route("/api/user/:id/appointments")
    // create a new Appointment
    .post(appointments.POST) 
    // list all Appointments for specific User
    .get(appointments.USER_GET); 

  // list all Appointments for specific Stylist
  app.route("/api/stylist/:id/appointments").get(appointments.STYLIST_GET); 

  app
    .route("/api/appointments/update/:id")
    // updates Appointment by Appointment ID
    .put(appointments.PUT) 
    // deletes Appointment by Appointment ID
    .delete(appointments.DELETE); 

  // FEEDBACK FUNCTIONS
  // testing route to get all feedback in database
  app.route("/api/feedback").get(feedback.GET); 

  // create a new Feedback
  app.route("/api/appointment/:id/feedback").post(feedback.POST); 

  // list all Feedback for specific User
  app.route("/api/user/:id/feedback").get(feedback.USER_GET); 

  // list all Feedback for specific Stylist
  app.route("/api/stylist/:id/feedback").get(feedback.STYLIST_GET); 
  app
    .route("/api/feedback/update/:id")
    // updates Feedback by Feedback ID
    .put(feedback.PUT) 
    // deletes Feedback by Feedback ID
    .delete(feedback.DELETE); 

  // SERVICES FUNCTIONS
  app
    .route("/api/service")
    // testing route to get all Services in database
    .get(service.GET) 
    // create a new Service
    .post(service.POST); 

    // Get specific Service
  app.route("/api/service/:id").get(service.SERVICE_GET); 
  app
    .route("/api/service/update/:id")
    // updates Service by Service ID
    .put(service.PUT) 
    // deletes Service by Service ID
    .delete(service.DELETE); 
};
//Routes
