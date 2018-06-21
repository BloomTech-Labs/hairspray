import axios from "axios";
import * as actiontype from "./actiontypes";
export * from "./actiontypes";
export * from "./serviceActions";
export * from "./feedbackActions";
export * from "./appointmentActions";

const URL = "http://localhost:5000";
// The list of action variables was getting very long,
// so I moved them all to a seperate file 'actiontypes.js'
// if you need to add action variables, do so in that file

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
        dispatch({
          type: actiontype.USER_UPDATE_COMPLETE,
          payload: updatedUser.data
        });
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
export const register = (
  name,
  email,
  phone,
  password,
  confirmPassword,
  history
) => {
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
      .then(() => {
        dispatch({
          type: actiontype.USER_REGISTERED
        });
        history.push("/signin");
      })
      .catch(err => {
        dispatch(authError("Did Not Register, Try Again"));
      });
  };
};

// login user
export const login = (username, password, history) => {
  return dispatch => {
    axios
      .post(`${URL}/login`, { username, password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: actiontype.USER_AUTHENTICATED
        });
        history.push("/signup"); //TODO:
      })
      .catch(err => {
        dispatch(
          authError("Your Username and/or Password is Incorrect, Try Again")
        );
      });
  };
};
