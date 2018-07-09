const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/User.js");
var settings = require("../config/settings");
var jwt = require("jsonwebtoken");
const { requireAuth, getTokenForUser } = require("../config/auth");
const bcrypt = require("bcrypt");
const stripe = require("stripe")("sk_test_vY2PFCv47VGRTiS3Cb9c7uky");
const keyPublish = process.env.PUBLISHABLE_KEY;

// User.create({
//   name: "Admin",
//   phone: "3104567683",
//   email: "admin@admin.com",
//   password: "automatichash"
// });

const createUser = (req, res) => {
  const { name, phone, email, password } = req.body;
  const user = new User({ name, phone, email, password });
  user.save((err, user) => {
    if (err) {
      return res.status(400).send({ err });
    }
    const token = getTokenForUser({
      username: email
    });
    res.status(200).json({
      success: "User was saved",
      user,
      token
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
    const userID = user._id;
    user.checkPassword(password, (nonMatch, hashMatch) => {
      // This is an example of using our User.method from our model.
      if (nonMatch !== null) {
        res.status(422).json({ error: "passwords dont match" });
        return;
      }
      if (hashMatch) {
        const token = getTokenForUser({
          username: user.email
        });
        res.json({ token, userID });
      }
    });
  });
};

//  Get profile if has one
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

//  Useless route for now.
const getUsers = (req, res) => {
  // This controller will not work until a user has sent up a valid JWT
  // check out what's going on in services/index.js in the `validate` token function
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

//User profile update
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, phone, email, password } = req.body;
  bcrypt.hash(password, 11, (err, hash) => {
    if (err) res.json({ error: err });
    const newPass = hash;
    User.findByIdAndUpdate(id, { name, phone, email, newPass }, { new: true })
      .then(updatedUser => {
        res.json({ success: updatedUser });
      })
      .catch(err => {
        res.json({ error: err });
      });
  });
};

const fulfillRequest = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const createCharge = (req, res) => {
  stripe.charges.create(req.body, fulfillRequest(res));
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  userLogin,
  createCharge
};
