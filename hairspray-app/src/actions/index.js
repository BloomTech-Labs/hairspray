import axios from 'axios';

const URL = 'http://localhost:5000';
// Todo: make actions and variables for all actions
export const TOGGLE_UPDATE_USER_FORM = "TOGGLE_UPDATE_USER_FORM";
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const ERROR = "ERROR";

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
            .put(`${URL}/users/${id}`, {name, number, email, password })
            .then(updatedUser => {
                console.log("ACTIONs: ", updatedUser.data);
                dispatch({ type: USER_UPDATE_COMPLETE, payload: updatedUser.data});
            })
            .catch(err => {
                dispatch({ type: err });
            });
    }
}
