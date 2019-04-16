import * as actiontype from "./actiontypes";
import axios from "axios";
import { authError } from "./index.js";

const URL = "https://obscure-island-58835.herokuapp.com/api";
// const URL = "http://localhost:5000/api";

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
        history.push("/user/home");
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
        history.push("/user/home");
      })
      .catch(err => {
        dispatch(
          authError("Your Email and/or Password is Incorrect, Try Again")
        );
      });
  };
};

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
};

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
        dispatch({
          type: actiontype.USER_UPDATE_COMPLETE,
          payload: updatedUser.data
        });
        dispatch({ type: actiontype.TOGGLE_UPDATE_USER_FORM });
        history.push("/user/home");
      })
      .catch(err => {
        dispatch({ type: err });
      });
  };
};
