import axios from "axios";

const URL = "http://localhost:5000";
// Todo: make actions and variables for all actions
export const TOGGLE_UPDATE_USER_FORM = "TOGGLE_UPDATE_USER_FORM";
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const ERROR = "ERROR";

export const USER_REGISTERED = "USER_REGISTERED";
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const CHECK_IF_AUTHENTICATED = "CHECK_IF_AUTHENTICATED";
export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

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
          type: USER_REGISTERED
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
          type: USER_AUTHENTICATED
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
