import axios from 'axios';

const URL = 'http://localhost:5000';
// Todo: make actions and variables for all actions
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";

// Change user settings
export const userSettingsChange = () => {
    return dispatch => {
        dispatch({ USER_UPDATING });
        axios
            .put(`${URL}/user/update`)
            .then(updatedUser => {
                dispatch({ type: USER_UPDATE_COMPLETE, payload: updatedUser});
            })
            .catch(err => {
                dispatch(err.toString());
            });
    }
}