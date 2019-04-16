const mongoose = require("mongoose");
const User = require("../models/User.js");
var settings = require("../config/settings");
const Feedback = require("../models/Feedback.js");
const Appointments = require("../models/Appointment");

// testing function to see all stylists
const getAllFeedbacks = (req, res) => {
	Feedback.find({})
		.populate({
			path: "appointment",
			populate: { path: "user stylist" }
		})
		.then(feedback => {
			res.send(feedback);
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

// function to create a new feedback and save to database
// user id should be passed in through :id params
// must pass in a stylist and date in format "2018-08-22T12:12:12.764Z"
const createFeedback = (req, res) => {
	const appointment = req.params.id;
	const consultationScore = req.body.consultationScore;
	const ontimeScore = req.body.ontimeScore;
	const stylingScore = req.body.stylingScore;
	const customerserviceScore = req.body.customerserviceScore;
	const overallScore = req.body.overallScore;

	const consultation = req.body.consultation;
	const ontime = req.body.ontime;
	const styling = req.body.styling;
	const customerservice = req.body.customerservice;
	const overall = req.body.overall;

	const feedback = new Feedback({
		appointment,
		consultationScore,
		ontimeScore,
		stylingScore,
		customerserviceScore,
		overallScore,
		consultation,
		ontime,
		styling,
		customerservice,
		overall
	});
	feedback
		.save()
		.then(feedback => {
			res.status(200).json({
				success: "Feedback saved",
				feedback
			});
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

// function to get and array of feedbacks for a User, specified by their id
// user id should be passed in through :id params
const getUserFeedbacks = (req, res) => {
	const userID = req.params.id;
	Feedback.find({})
		.populate({
			path: "appointment",
			populate: { path: "user stylist" },
			match: {
				user: userID
			}
		})
		.then(feedback => {
			if (feedback.length === 0) {
				res.json({
					success: "There are no Feedbacks for this User"
				});
			} else {
				let userFeedback = [];
				feedback.forEach((el, i) => {
					if (el.appointment !== null) userFeedback.push(feedback[i]);
				});
				if (userFeedback.length === 0) {
					res.json({ success: "This Stylist has no feedback" });
				} else {
					res.status(200).json({
						success: userFeedback
					});
				}
			}
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to get an array of feedbacks for a Stylist, specified by their id
// user id should be passed in through :id params
const getStylistFeedbacks = (req, res) => {
	const stylistID = req.params.id;
	Feedback.find()
		.populate({
			path: "appointment",
			populate: { path: "user stylist" },
			match: {
				stylist: stylistID
			}
		})
		.then(feedback => {
			if (feedback.length === 0) {
				res.json({
					success: "There are no Feedbacks for this User"
				});
			} else {
				let stylistFeedback = [];
				feedback.forEach((el, i) => {
					if (el.appointment !== null) stylistFeedback.push(feedback[i]);
				});
				if (stylistFeedback.length === 0) {
					res.json({ success: "This Stylist has no feedback" });
				} else {
					res.status(200).json({
						success: stylistFeedback
					});
				}
			}
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to update a single feedback by its ID
// feedback id should be passed in through :id params
// must pass in a neccessary feedback. Scores are required
const updateFeedback = (req, res) => {
	const { id } = req.params;
	const {
		appointment,
		consultationScore,
		ontimeScore,
		stylingScore,
		customerserviceScore,
		overallScore,
		consultation,
		ontime,
		styling,
		customerservice,
		overall
	} = req.body;
	Feedback.findByIdAndUpdate(id, req.body, { new: true })
		.then(feedback => {
			if (feedback === null) {
				res.json({ error: "That Feedback does not exist" });
			} else {
				res.status(200).json({
					success: "Feedback updated successfully",
					feedback
				});
			}
		})
		.catch(err => {
			res.status(400).json({ error: err });
		});
};

// function to delete an feedback by its id
// feedback id should be passed in through :id params
const deleteFeedback = (req, res) => {
	const { id } = req.params;
	Feedback.findByIdAndRemove(id)
		.then(deleted => {
			if (deleted === null) {
				res.status(404).json({ error: "Feedback not found" });
			} else {
				res.status(200).json({
					success: "Deleted successfully"
				});
			}
		})
		.catch(err => {
			res.status(400).send({ error: err });
		});
};

module.exports = {
	POST: createFeedback,
	GET: getAllFeedbacks,
	PUT: updateFeedback,
	DELETE: deleteFeedback,
	USER_GET: getUserFeedbacks,
	STYLIST_GET: getStylistFeedbacks
};
