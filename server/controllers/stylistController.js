const mongoose = require("mongoose");
var settings = require("../config/settings");
const Stylist = require("../models/Stylist.js");

// testing endpoint to see all stylists
const getAllStylists = (req, res) => {
	Stylist.find({}, (err, stylists) => {
		res.send(stylists);
	});
};

// endpoint to create a new stylist and save to database
const createStylist = (req, res) => {
	const { name, email, password, image } = req.body;
	const stylist = new Stylist({ name, email, password, image });
	stylist.save((err, stylist) => {
		if (err) return res.send(err);
		res.json({
			success: "Stylist saved",
			stylist
		});
	});
};

const getStylist = (req, res) => {
	const { id } = req.params;
	Stylist.findById(id).exec((err, stylist) => {
		if (err) {
			res.status(422).json({ error: "error getting stylist" });
			return;
		}
		if (stylist === null) res.status(422).json({ error: `No stylist found` });
		res.json(stylist);
	});
};

const updateStylist = (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	Stylist.findByIdAndUpdate(id, req.body, { new: true }).exec(
		(err, stylist) => {
			if (err) {
				res.status(404).json({ error: "Could not find that stylist" });
			}
			res.status(200).json({
				success: "Stylist updated successfully",
				stylist
			});
		}
	);
};

const deleteStylist = (req, res) => {
	const { id } = req.params;
	Stylist.findByIdAndRemove(id)
		.then(deleted => {
			if (deleted === null) {
				res.status(404).json({ error: "Stylist not found" });
			}
			res.status(200).json({
				success: "Deleted successfully"
			});
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

module.exports = {
	POST: createStylist,
	STYLIST_GET: getStylist,
	GET: getAllStylists,
	PUT: updateStylist,
	DELETE: deleteStylist
};
