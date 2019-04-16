import { GETTING_SERVICES, SERVICES_GOT } from "../actions";

const initialState = {
  services: [],
  gettingService: false
};

export const ServicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_SERVICES:
			return { ...state, gettingService: true };
		case SERVICES_GOT:
			return { ...state, gettingService: false, services: action.payload };
		default:
			return state;
	}
};
