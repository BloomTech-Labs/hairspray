const bcrypt = require("bcrypt");
const User = require("../models/User");

const BCRYPT_SALT = 11;

const hashedPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(422).json({ error: "You have given no password to hash" });
    return;
  }
  bcrypt
    .hash(password, BCRYPT_SALT)
    .then(pass => {
      req.password = pass;
      next();
    })
    .catch(err => {
      res.status(500).json({ error: { err } });
    });
};

const authenticate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(422).json({ error: "You need an email to authenticate" });
    return;
  }
  User.findOne({ email }, (err, user) => {
    if (err || user === null) {
      res.status(500).json({ error: "Cannot find user to authenticate" });
      return;
    }
    const hashedPass = user.password;
    bcrypt
      .compare(password, hashedPass)
      .then(response => {
        if (!response)
          res.status(500).json({
            error: "There was no response from the authentication server"
          });
        req.loggedInUser = user;
        next();
      })
      .catch(err => {
        res.status(500).json({ error: { err } });
        return;
      });
  });
};

module.exports = {
  hashedPassword,
  authenticate
};
