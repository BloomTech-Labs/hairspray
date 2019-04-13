const feedback = require('../controllers/feedbackController');
const router = require('express').Router();

router.route('/').get(feedback.GET);
router.route('//appointment/:id').post(feedback.POST);
router.route('/user/:id/').get(feedback.USER_GET);
router.route('/stylist/:id/').get(feedback.STYLIST_GET);

router
  .route('/:id')
  .put(feedback.PUT)
  .delete(feedback.DELETE);

module.exports = router;
