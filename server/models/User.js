// Optional bool in UserSchema to control admin privileges, commented out right now

const mongoose = require("mongoose");
const validate = require("mongoose-validator");
var bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { required: true, type: String },
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
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
    required: true,
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
  password: {
    type: String,
    validate: [
      validate({
        validator: "isLength",
        arguments: [6, 80],
        message: "Password must at least have 6 characters"
      })
    ]
  },
  cart: { type: Number, required: true, default: 0 },
  date: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  // check passwords
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
