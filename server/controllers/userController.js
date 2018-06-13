const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/User.js");
var settings = require("../config/settings");
var jwt = require("jsonwebtoken");
const { requireAuth, getTokenForUser } = require("../config/auth");

const createUser = (req, res) => {
  const { name, phone, email, password } = req.body;
  const user = new User({ name, phone, email, password });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({
      success: "User was saved",
      user
    });
  });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Invalid Username/Password" });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: "No user with that username in our DB" });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      // This is an example of using our User.method from our model.
      if (nonMatch !== null) {
        res.status(422).json({ error: "passwords dont match" });
        return;
      }
      if (hashMatch) {
        const token = getTokenForUser({ username: user.email });
        res.json({ token });
      }
    });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(422).json({ "That user doesn't exist": err });
      return;
    }
    res.json(user);
  });
};

const getUsers = (req, res) => {
  // This controller will not work until a user has sent up a valid JWT
  // check out what's going on in services/index.js in the `validate` token function
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  User.findByIdAndUpdate(id, req.body).exec((err, user) => {
    if (err) {
      res.status(422).json({ "Could not find that user": err });
      return;
    }
    res.json(user);
  });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  userLogin
};
