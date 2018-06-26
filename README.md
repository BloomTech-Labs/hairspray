# hairspray
CS7 Capstone Project

## Heroku link
(https://obscure-island-58835.herokuapp.com)

# Routes

### Logging in
- /login
POST - log a user in and recieve a JWT

### Users
- /signup
POST - create a new user
GET - get all current users
- /users/:id
GET - get a specific user
PUT - update a specific user

### Stylists
- /stylist/
GET - testing route to get a list of all stylists in database
POST - create a new stylist
- /stylist/:id
GET - get a stylist by their id
PUT - updates Stylist by Stylist ID
DELETE - deletes Stylist by Stylist ID

### Appointments
- /user/:id/appointments
POST - create a new Appointment
GET - list all appointments for specific user
- /stylist/:id/appointments
GET - lists all appointments for a Stylist
- /appointments/update/:id
PUT - updates appointment by appointment ID
DELETE - deletes appointment by appointment ID

### Feedback
- /feedback
GET - get all feedback in database
- /appointment/:id/feedback
POST - create new feedback
- /user/:id/feedback
GET - Gets an array of all the Feedback a User has submitted
- /stylist/:id/feedback
GET - Gets an array of all the Feedback a Stylist has received
- /feedback/update/:id
PUT - Updates previously submitted feedback via Feedback ID
DELETE - Deletes Feedback by Feedback ID

### Service
- /service
GET - get all Services in database
POST - create new Service
- /service/:id/
GET - Gets a specific Service
- /service/update/:id
PUT - Updates a Service via Service ID
DELETE - Deletes a Service via Service ID