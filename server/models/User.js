const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
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
        validator: 'isEmail',
        message: 'This is not a valid email address'
      })
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [6, 80],
        message: 'Password must at least have 6 characters'
      })
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: { required: true, type: String },
  phone: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    validate: [
      validate({
        validator: 'isNumeric',
        arguments: [7, 20],
        message: 'This is not a valid phone number'
      })
    ]
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  verify: {
    type: String,
    trim: true,
    sparse: true
  }
  //TODO collect data about last appointments, and favorite stylists
  // favorites: {
  //   last_apt: Schema.Types.ObjectId,
  //   stylists:
  // }
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.password).then(isMatch => {
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
