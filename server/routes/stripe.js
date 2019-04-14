const users = require('../controllers/userController');
const router = require("express").Router();
const { validateToken } = require('../config/auth');

router.route('/').post(validateToken, users.createCharge);

module.exports = router;