const users = require('../controllers/userController');
const router = require('express').Router();
const { validateToken, getToken } = require('../config/auth');

// router.route('/').get(validateToken, users.getUsers);

router
  .route('/')
  .post(users.createUser)
  .get(users.getUsers);
router
  .route('/:id')
  .put(validateToken, users.updateUser)
  .get(users.getUser);
router.route('/login').post(users.userLogin);

module.exports = router;
