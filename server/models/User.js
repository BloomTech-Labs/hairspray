const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let UserSchema = new mongoose.Schema({
  name: { type: String },
  last: { type: String },
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true,
    validate: [
      validate({
        validator: "isNumeric",
        arguments: [7, 20],
        message: "This is not a valid phone number"
      })
    ]
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    validate: [
      validate({
        validator: "isEmail",
        message: "This is not a valid email"
      })
    ]
  },
  password: { type: String }
});

UserSchema.pre("save", function(next) {});
