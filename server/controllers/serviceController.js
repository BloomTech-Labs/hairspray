const Service = require('../models/Service.js');

// endpoint to create a new service and save to database
const createService = (req, res) => {
  if (!req.body.service)
    return res.status(500).json({ error: 'No Service submitted' });
  const { service } = req.body;
  const newService = new Service(service);
  newService
    .save()
    .then(() => {
      res.status(200).json({
        success: 'Service saved'
      });
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

// testing endpoint to see all services
const getAllServices = (req, res) => {
  Service.find({})
    .then(services => {
      res.status(200).send(services);
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

const getService = (req, res) => {
  const { id } = req.params;
  Service.findById(id)
    .then(service => {
      if (service === null) res.status(422).json({ error: `No service found` });
      res.status(200).send(service);
    })
    .catch(err => {
      res.status(422).json({ error: 'error getting service' });
    });
};

const updateService = (req, res) => {
  const { id } = req.params;
  const { type, price } = req.body;
  Service.findByIdAndUpdate(id, (type, price), { new: true })
    .then(service => {
      if (service === null) res.status(422).json({ error: `No service found` });
      res.status(200).json({
        success: 'Service updated successfully',
        update: service
      });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};

const deleteService = (req, res) => {
  const { id } = req.params;
  Service.findByIdAndRemove(id)
    .then(deleted => {
      if (deleted === null) {
        res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json({
        success: 'Deleted successfully'
      });
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

module.exports = {
  POST: createService,
  SERVICE_GET: getService,
  GET: getAllServices,
  PUT: updateService,
  DELETE: deleteService
};
