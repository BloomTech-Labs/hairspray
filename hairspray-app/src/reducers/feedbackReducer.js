import { CREATING_FEEDBACK, FEEDBACK_CREATED, TOGGLE_FEEDBACK_FORM, GETTING_ALL_FEEDBACKS, GOT_ALL_FEEDBACKS } from "../actions";

const initialState = {
	feedback: [],
	feedbacks: [],
	creatingFeedback: false,
	showFeedbackForm: false,
	gettingAllFeedbacks: false
};

export const FeedbackReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATING_FEEDBACK:
			return { ...state, creatingFeedback: true };
		case FEEDBACK_CREATED:
			return { ...state, creatingFeedback: false, feedback: action.payload };
		case TOGGLE_FEEDBACK_FORM:
			return {
				...state,
				showFeedbackForm: !state.showFeedbackForm
			};
		case GETTING_ALL_FEEDBACKS:
			return {...state, gettingAllFeedbacks: true }
		case GOT_ALL_FEEDBACKS:
			return {...state, gettingAllFeedbacks: false, feedbacks: action.payload }
		default:
			return state;
	}
};
