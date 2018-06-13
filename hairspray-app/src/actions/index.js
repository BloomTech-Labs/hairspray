import axios from 'axios';

const URL = 'http://localhost:3000';
// Todo: make actions and variables for all actions
export const TOGGLE_UPDATE_USER_FORM = "TOGGLE_UPDATE_USER_FORM";
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const ERROR = "ERROR";

// Toggle for button in UserSettings to show form
export const toggleUpdateForm = () => {
    return {
      type: TOGGLE_UPDATE_USER_FORM
    };
  };
  

// Change user settings
export const userSettingsChange = updates => {
    const { id, name, number, email } = updates;
    return dispatch => {
        dispatch({ USER_UPDATING });
        axios
            .put(`${URL}/users/${id}`, {name, number, email })
            .then(updatedUser => {
                dispatch({ type: USER_UPDATE_COMPLETE, payload: updatedUser});
            })
            .catch(err => {
                dispatch(err.toString());
            });
    }
}