import axios from "axios";

const URL = "http://localhost:5000";
// Todo: make actions and variables for all actions
export const ERROR = "ERROR";

export const GETTING_USERS = "GETTING_USERS";
export const GOT_USERS = "GOT_USERS";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const TOGGLE_UPDATE_USER_FORM = "TOGGLE_UPDATE_USER_FORM";

export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const CHECK_IF_AUTHENTICATED = "CHECK_IF_AUTHENTICATED";
export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const SETTING_APPOINTMENT = "SETTING_APPOINTMENT";
export const APPOINTMENT_SET = "APPOINTMENT_SET";

export const STYLIST_UPDATING = "STYLIST_UPDATING";
export const STYLIST_UPDATE_COMPLETE = "STYLIST_UPDATE_COMPLETE";
export const TOGGLE_UPDATE_STYLIST_FORM = "TOGGLE_UPDATE_STYLIST_FORM";
export const GETTING_STYLISTS = "GETTING_STYLISTS";
export const GOT_STYLISTS = "GOT_STYLISTS";

// Scheduling Actions
export const setApppointment = (data) => {
	const user = localStorage.getItem("uuID");
	console.log("data", data)
	return dispatch => {
		dispatch({ type: SETTING_APPOINTMENT });
		axios
			.post(`${URL}/user/${user}/appointments`, {session: data.session, user, stylist: data.stylist})
			.then(appointment => {
				dispatch({ type: APPOINTMENT_SET, payload: appointment.data});
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
		dispatch({ type: GETTING_STYLISTS });
		axios
			.get(`${URL}/stylist`)
			.then(stylists => {
				dispatch({ type: GOT_STYLISTS, payload: stylists.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

// User Actions
export const getAllUsers = () => {
	return dispatch => {
		dispatch({ type: GETTING_USERS });
		axios
			.get(`${URL}/signup`)
			.then(users => {
				dispatch({ type: GOT_USERS, payload: users.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const toggleUpdateForm = () => {
	return {
		type: TOGGLE_UPDATE_USER_FORM
	};
};

// Change user settings
export const userSettingsChange = updates => {
	const { id, name, number, email, password } = updates;
	return dispatch => {
		dispatch({ type: USER_UPDATING });
		axios
			.put(`${URL}/users/${id}`, { name, number, email, password })
			.then(updatedUser => {
				dispatch({ type: USER_UPDATE_COMPLETE, payload: updatedUser.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};

export const authError = error => {
	return {
		type: AUTHENTICATION_ERROR,
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
					type: USER_REGISTERED
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
					type: USER_AUTHENTICATED
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
