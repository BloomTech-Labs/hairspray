const mongoose = require("mongoose");
const validate = require("mongoose-validator");
var bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const StylistSchema = Schema({
  name: { required: true, type: String },
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
  date: {
    type: Date,
    default: Date.now
  },
  image: { type: String }
});

StylistSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

StylistSchema.methods.checkPassword = function(potentialPassword, cb) {
  // check passwords
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Stylist", StylistSchema);
