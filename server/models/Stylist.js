const mongoose = require('mongoose');
const validate = require('mongoose-validator');
var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const StylistSchema = Schema({
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
  avatar: { type: String },
  appointments: [Schema.Types.ObjectId],
  feedback: [Schema.Types.ObjectId],
  services: [Schema.Types.ObjectId]
});

StylistSchema.pre('save', (next) => {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

StylistSchema.methods.checkPassword = (potentialPassword, cb) => {
  bcrypt.compare(potentialPassword, this.password).then(isMatch => {
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Stylist', StylistSchema);
