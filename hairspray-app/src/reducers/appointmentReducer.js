import { SETTING_APPOINTMENT, APPOINTMENT_SET } from "../actions";

const initialState = {
  settingAppointment: false
};

export const AppointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SETTING_APPOINTMENT:
			return { ...state, settingAppointment: true };
		case APPOINTMENT_SET:
			return { ...state, settingAppointment: false };

		default:
			return state;
	}
};
