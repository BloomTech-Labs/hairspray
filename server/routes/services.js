const service = require('../controllers/serviceController');
const router = require('express').Router();

router
  .route('/')
  .get(service.GET)
  .post(service.POST);
router
  .route('/:id')
  .get(service.SERVICE_GET)
  .put(service.PUT)
  .delete(service.DELETE);

module.exports = router;
