/* eslint-disable */

const userControllerStrategy = require("../controllers/userController");
const express = require("express");
const { validateToken } = require("../config/auth");
const { getUsers } = require("../controllers/userController");

module.exports = (app) => {
  app
    .route("/signup")
    .post(userControllerStrategy.createUser)
    .get(validateToken, getUsers);
  app.route("/users/:id").get(userControllerStrategy.getUser);
  app.route("/users/:id").put(userControllerStrategy.updateUser);
  app.route("/login").post(userControllerStrategy.userLogin);
};
