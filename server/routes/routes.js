const userControllerStrategy = require('../controllers/userController');
const express = require('express');
const middleAuth = require('../middleware/middleware');

module.exports = (app) => {
  app
    .route('/create-user')
    .post(middleAuth.hashedPassword, userControllerStrategy.createUser);
  app.route('/users/:id').get(userControllerStrategy.getUser);
  app.route('/users/:id').put(userControllerStrategy.updateUser);
  app
    .route('/login')
    .post(middleAuth.authenticate, userControllerStrategy.userLogin);
};
