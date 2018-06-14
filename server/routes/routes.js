const userControllerStrategy = require("../controllers/userController");
const adminControllerStrategy = require("../controllers/adminController");
const express = require("express");
const middleAuth = require("../middleware/middleware");

module.exports = app => {
  app
    .route("/signup")
    .post(middleAuth.hashedPassword, userControllerStrategy.createUser);
  app.route("/users/:id").get(userControllerStrategy.getUser);
  app.route("/users/:id").put(userControllerStrategy.updateUser);
  app
    .route("/login")
    .post(middleAuth.authenticate, userControllerStrategy.userLogin);
  app
    .route("/adminSignup")
    .post(adminControllerStrategy.createAdmin)
    // .get(validateToken, getAdmin);
  app.route("/admin/:id").get(adminControllerStrategy.getAdmin);
  app.route("/admin/:id").put(adminControllerStrategy.updateAdmin);
  app.route("adminLogin").post(adminControllerStrategy.adminLogin);
};
