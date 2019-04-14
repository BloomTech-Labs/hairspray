const Feedback = require('../models/Feedback.js');

const createFeedback = (req, res) => {
  if (!req.body.feedback)
    return res.status(500).json({ error: 'No Feedback submitted' });  
  const { feedback } = req.body;

  const newFeedback = new Feedback(feedback);
  newFeedback
    .save()
    .then(() => {
      res.status(200).json({
        success: 'Feedback saved'
      });
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

// testing function to see all stylists
const getAllFeedbacks = (req, res) => {
  Feedback.find({})
    .populate({
      path: 'appointment',
      populate: { path: 'user stylist' }
    })
    .then(feedback => {
      res.send(feedback);
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
      path: 'appointment',
      populate: { path: 'user stylist' },
      match: {
        user: userID
      }
    })
    .then(feedback => {
      if (feedback.length === 0) {
        res.json({
          success: 'There are no Feedbacks for this User'
        });
      } else {
        let userFeedback = [];
        feedback.forEach((el, i) => {
          if (el.appointment !== null) userFeedback.push(feedback[i]);
        });
        if (userFeedback.length === 0) {
          res.json({ success: 'This Stylist has no feedback' });
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
      path: 'appointment',
      populate: { path: 'user stylist' },
      match: {
        stylist: stylistID
      }
    })
    .then(feedback => {
      if (feedback.length === 0) {
        res.json({
          success: 'There are no Feedbacks for this User'
        });
      } else {
        let stylistFeedback = [];
        feedback.forEach((el, i) => {
          if (el.appointment !== null) stylistFeedback.push(feedback[i]);
        });
        if (stylistFeedback.length === 0) {
          res.json({ success: 'This Stylist has no feedback' });
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
        res.json({ error: 'That Feedback does not exist' });
      } else {
        res.status(200).json({
          success: 'Feedback updated successfully',
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
        res.status(404).json({ error: 'Feedback not found' });
      } else {
        res.status(200).json({
          success: 'Deleted successfully'
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
