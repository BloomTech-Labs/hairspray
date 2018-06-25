import axios from "axios";
import * as actiontype from './actiontypes';
export * from './actiontypes';
export * from './userActions';
export * from './serviceActions';
export * from './feedbackActions';
export * from './appointmentActions';

// const URL = "https://obscure-island-58835.herokuapp.com/api";
const URL = "http://localhost:5000/api";

// The list of action variables was getting very long,
// so I moved them all to a seperate file 'actiontypes.js'
// if you need to add action variables, do so in that file
// and them import them here by preceding the variable with
// 'actiontype.' example: actiontype.GOT_STYLIST

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
			.then(res => {
				const token = res.data.token;
				axios.defaults.headers.common["Authorization"] = token;
				localStorage.setItem("userID", res.data.user._id);
				dispatch({
					type: actiontype.USER_REGISTERED
				});
				history.push("/user");
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
			.then(res => {
				const token = res.data.token;
				axios.defaults.headers.common["Authorization"] = token;
				localStorage.setItem("userID", res.data.userID);
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
