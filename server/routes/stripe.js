const users = require('../controllers/userController');
const router = require("express").Router();

router.route('/').post(validateToken, users.createCharge);

module.exports = router;