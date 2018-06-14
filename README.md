# hairspray
CS7 Capstone Project

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

### Appointments
- /user/:id/appointments
POST - create a new Appointment
GET - list all appointments for specific user
- /appointments/update/:id
PUT - updates appointment by appointment ID
DELETE - deletes appointment by appointment ID
### Stylists
- /stylists/
GET - testing route to get a list of all stylists in database
POST - create a new stylist
- /stylist/:id
GET - get a stylist by their id