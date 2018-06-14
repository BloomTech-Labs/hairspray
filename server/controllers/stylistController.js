const mongoose = require("mongoose");
var settings = require("../config/settings");
const Stylist = require("../models/Stylist.js");

// testing endpoint to see all stylists
const getAllStylists = (req, res) => {
  Stylist.find({}, (err, stylists) => {
    res.send(stylists);
  });
}

// endpoint to create a new stylist and save to database
const createStylist = (req, res) => {
  const { name, email, password } = req.body;
  const stylist = new Stylist({ name, email, password });
  stylist.save((err, stylist) => {
    if (err) return res.send(err);
    res.json({
      success: "Stylist saved",
      stylist
    });
  });
}

const getStylist = (req, res) => {
  const { id } = req.params;
  Stylist.findById(id).exec((err, stylist) => {
    if (err) {
      res.status(422).json({ error: "error getting stylist" });
      return;
    }
    if (stylist === null) res.status(422).json({error: `No stylist found`});
    res.json(stylist);
  });
};

module.exports = {
  createStylist,
  getStylist,
  getAllStylists
}