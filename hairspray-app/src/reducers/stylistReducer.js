import {
	STYLIST_UPDATING,
	STYLIST_UPDATE_COMPLETE,
	GETTING_STYLISTS,
	GOT_STYLISTS
} from "../actions";

const initialState = {
	stylist: [],
	stylists: [],
	updatingStylist: false,
	gettingStylists: false
};

export const StylistReducer = (state = initialState, action) => {
	switch (action.type) {
		case STYLIST_UPDATING:
			return { ...state, updatingStylist: true };
		case STYLIST_UPDATE_COMPLETE:
			return {
				...state,
				stylist: action.payload,
				updatingNote: false
			};
		case GETTING_STYLISTS:
			return { ...state, gettingStylists: true };
		case GOT_STYLISTS:
			return { ...state, gettingStylists: false, stylists: action.payload };
		default:
			return state;
	}
};
