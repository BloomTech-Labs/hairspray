const stylists = require('../controllers/stylistController');
const router = require('express').Router();

router
  .route('/')
  .get(stylists.GET)
  .post(stylists.POST);
router
  .route('/:id')
  .get(stylists.STYLIST_GET)
  .put(stylists.PUT)
  .delete(stylists.DELETE);

module.exports = router;
