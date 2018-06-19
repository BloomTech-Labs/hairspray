import axios from "axios";
import * as actiontype from './actiontypes';
export * from './actiontypes';
export * from './serviceActions';


// The list of action variables was getting very long,
// so I moved them all to a seperate file 'actiontypes.js'
// if you need to add action variables, do so in that file

const URL = "http://localhost:5000";

// Scheduling Actions
export const setApppointment = (data) => {
	const user = localStorage.getItem("userID");
	return dispatch => {
		dispatch({ type: actiontype.SETTING_APPOINTMENT });
		axios
			.post(`${URL}/user/${user}/appointments`, {session: data.session, user, stylist: data.stylist, service: data.service})
			.then(appointment => {
				dispatch({ type: actiontype.APPOINTMENT_SET, payload: appointment.data});
				alert("Appointment set!");
				data.history.push("/user/billing");
			})
			.catch(err => {
				console.log("Appointment failed: ", err);
				dispatch({ type: err });
			});
	};
};

// Stylist Actions

export const getAllStylists = () => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_STYLISTS });
		axios
			.get(`${URL}/stylist`)
			.then(stylists => {
				dispatch({ type: actiontype.GOT_STYLISTS, payload: stylists.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

// User Actions
export const getAllUsers = () => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_USERS });
		axios
			.get(`${URL}/signup`)
			.then(users => {
				dispatch({ type: actiontype.GOT_USERS, payload: users.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const toggleUpdateForm = () => {
	return {
		type: actiontype.TOGGLE_UPDATE_USER_FORM
	};
};

// Change user settings
export const userSettingsChange = updates => {
	const { id, name, number, email, password } = updates;
	return dispatch => {
		dispatch({ type: actiontype.USER_UPDATING });
		axios
			.put(`${URL}/users/${id}`, { name, number, email, password })
			.then(updatedUser => {
				dispatch({ type: actiontype.USER_UPDATE_COMPLETE, payload: updatedUser.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const authError = error => {
	return {
		type: actiontype.AUTHENTICATION_ERROR,
		payload: error
	};
};

// Register a new user
export const register = (user, history) => {
	const { name, phone, email, password, confirmPassword } = user;
	return dispatch => {
		if (password !== confirmPassword) {
			dispatch(authError("Please Re-enter Your Password"));
			return;
		}
		axios
			.post(`${URL}/signup`, {
				name,
				phone,
				email,
				password
			})
			.then(user => {
				dispatch({
					type: actiontype.USER_REGISTERED
				});
				history.push("/user/signin");
			})
			.catch(err => {
				dispatch(authError(`${err}, Try Again`));
			});
	};
};

// login user
export const login = (user, history) => {
	const { email, password } = user;
	return dispatch => {
		axios
			.post(`${URL}/login`, { email, password })
			.then(response => {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("userID", response.data.userID);
				dispatch({
					type: actiontype.USER_AUTHENTICATED
				});
				history.push("/user");
			})
			.catch(err => {
				dispatch(
					authError("Your Email and/or Password is Incorrect, Try Again")
				);
			});
	};
};
