const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
