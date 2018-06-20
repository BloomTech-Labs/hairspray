import * as actiontype from './actiontypes';
import axios from "axios";

const URL = "http://localhost:5000";

// function accepts an ID for the appointment, an object of scores, and an object of feedback notes
export const createFeedback = (appointmentID, scores, feedback) => {
  const apptID = appointmentID;

  const userFeedback = {
    appointment: apptID,
    consultationScore: scores.consultationScore,
    ontimeScore: scores.ontimeScore,
    stylingScore: scores.stylingScore,
    customerserviceScore: scores.customerserviceScore,
    overallScore: scores.overallScore,
    consultation: feedback.consultation, 
    ontime: feedback.ontime, 
    styling: feedback.styling, 
    customerservice: feedback.customerservice, 
    overall: feedback.overall
  }
	return dispatch => {
		dispatch({ type: actiontype.CREATING_FEEDBACK });
		axios
			.post(`${URL}/appointment/${apptID}/feedback`, userFeedback)
			.then(feedback => {
				dispatch({ type: actiontype.FEEDBACK_CREATED, payload: feedback.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
  }
}

export const toggleFeedbackForm = () => {
  return {
		type: actiontype.TOGGLE_FEEDBACK_FORM
	};
}