import * as actiontype from './actiontypes';
import axios from "axios";
import { authError } from './index.js';

const URL = "http://localhost:5000/api";

export const getAllUsers = () => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_USERS });
		axios
			.get(`${URL}/signup`)
			.then(users => {
				dispatch({ type: actiontype.GOT_USERS, payload: users.data });
			})
			.catch(err => {
				dispatch(authError({ type: err }));
			}); 
	};
};

export const getSingleUser = () => {
	const user = localStorage.getItem("userID");
	return dispatch => {
		dispatch({ type: actiontype.GETTING_SINGLE_USER });
		axios
			.get(`${URL}/users/${user}`)
			.then(user => {
				dispatch({ type: actiontype.GOT_SINGLE_USER, payload: user.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
}

export const toggleUpdateForm = () => {
	return {
		type: actiontype.TOGGLE_UPDATE_USER_FORM
	};
};

// Change user settings
export const userSettingsChange = (updates, history) => {
	const id = localStorage.getItem("userID");
	const { name, phone, email, password } = updates;
	return dispatch => {
		dispatch({ type: actiontype.USER_UPDATING });
		axios
			.put(`${URL}/users/${id}`, { name, phone, email, password })
			.then(updatedUser => {
				dispatch({ type: actiontype.USER_UPDATE_COMPLETE, payload: updatedUser.data });
				dispatch({ type: actiontype.TOGGLE_UPDATE_USER_FORM });
				history.push("/user");
			})
			.catch(err => {
				dispatch({ type: err });
			});
	};
};
