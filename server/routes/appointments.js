const appointments = require('../controllers/appointmentController');
const router = require('express').Router();

router.route('/api/appointments/date').post(appointments.SEARCHBY_DATE);
router
  .route('/api/appointments/user/:id/')
  .post(appointments.POST)
  .get(appointments.USER_GET);
router.route('/api/appointments/stylist/:id').get(appointments.STYLIST_GET);
router
  .route('/api/appointments/date/stylist/:id')
  .post(appointments.SEARCHBY_DATE_STYLIST);

router
  .route('/api/appointments/:id')
  .put(appointments.PUT)
  .delete(appointments.DELETE);

module.exports = router;
