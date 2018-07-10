import {
	SETTING_APPOINTMENT,
	APPOINTMENT_SET,
	GETTING_APPOINTMENTS,
	APPOINTMENTS_GOT,
	GETTING_APPOINTMENTS_BY_DATE,
	GOT_APPOINTMENTS_BY_DATE
} from "../actions";

const initialState = {
	appointments: [],
	settingAppointment: false,
	gettingAppointments: false,
	gettingAppointmentsByDate: false
};

export const AppointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SETTING_APPOINTMENT:
			return { ...state, settingAppointment: true };
		case APPOINTMENT_SET:
			return { ...state, settingAppointment: false };
		case GETTING_APPOINTMENTS:
			return { ...state, gettingAppointments: true };
		case APPOINTMENTS_GOT:
			return { ...state, gettingAppointments: false, appointments: action.payload };
		case GETTING_APPOINTMENTS_BY_DATE:
			return { ...state, gettingAppointmentsByDate: true };
		case GOT_APPOINTMENTS_BY_DATE:
			return { ...state, gettingAppointmentsByDate: false, appointments: action.payload };
		default:
			return state;
	}
};
