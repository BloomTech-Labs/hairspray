import { CREATING_FEEDBACK, FEEDBACK_CREATED } from "../actions";

const initialState = {
  feedback: [],
  feedbacks: [],
  gettingFeedback: false
};

export const FeedbackReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATING_FEEDBACK:
			return { ...state, gettingFeedback: true };
		case FEEDBACK_CREATED:
			return { ...state, gettingFeedback: false, feedback: action.payload };
		default:
			return state;
	}
};
