const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/User.js");

const createUser = (req, res) => {
  const password = req.password;
  const { name, phone, email } = req.body;
  if (!email) {
    res.status(422).json({ error: "You didn't provide an email address" });
    return;
  }

  const newUser = new User({
    name,
    phone,
    email,
    password
  });
  newUser
    .save()
    .then(createdUser => res.json(createdUser))
    .catch(err => res.status(500).json(err));
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

const userLogin = (req, res) => {
  res.json(req.loggedInUser);
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  userLogin
};
