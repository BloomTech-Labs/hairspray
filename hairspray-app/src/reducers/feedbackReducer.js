import { CREATING_FEEDBACK, FEEDBACK_CREATED, TOGGLE_FEEDBACK_FORM } from "../actions";

const initialState = {
	feedback: [],
	feedbacks: [],
	creatingFeedback: false,
	showFeedbackForm: false
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
		default:
			return state;
	}
};
