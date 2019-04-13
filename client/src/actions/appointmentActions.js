import * as actiontype from "./actiontypes";
import axios from "axios";

const URL = "https://obscure-island-58835.herokuapp.com/api";
// const URL = "http://localhost:5000/api";

export const getAppointmentsByDateAndStylist = (date, stylist) => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_APPOINTMENTS });
		axios
			.post(`${URL}/date/stylist/appointments`, {
				date,
				stylist
			})
			.then(appointments => {
				dispatch({ type: actiontype.APPOINTMENTS_GOT, payload: appointments.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const getAllAppointments = () => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_APPOINTMENTS });
		axios
			.get(`${URL}/appointments`)
			.then(appointments => {
				dispatch({ type: actiontype.APPOINTMENTS_GOT, payload: appointments.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const getUserAppointments = () => {
	const user = localStorage.getItem("userID");
	return dispatch => {
		dispatch({ type: actiontype.GETTING_APPOINTMENTS });
		axios
			.get(`${URL}/user/${user}/appointments`)
			.then(appointments => {
				dispatch({ type: actiontype.APPOINTMENTS_GOT, payload: appointments.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const setApppointment = data => {
	const user = localStorage.getItem("userID");
	return dispatch => {
		dispatch({ type: actiontype.SETTING_APPOINTMENT });
		axios
			.post(`${URL}/user/${user}/appointments`, {
				session: data.session,
				user,
				stylist: data.stylist,
				service: data.service
			})
			.then(appointment => {
				dispatch({
					type: actiontype.APPOINTMENT_SET,
					payload: appointment.data
				});
				alert("Appointment set!");
				data.history.push("/user/billing");
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};
