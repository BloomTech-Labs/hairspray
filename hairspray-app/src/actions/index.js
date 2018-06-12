import axios from 'axios';

const URL = 'http://localhost:3000';
// Todo: make actions and variables for all actions
export const USER_UPDATING = "USER_UPDATING";
export const USER_UPDATE_COMPLETE = "USER_UPDATE_COMPLETE";
export const TEST_START = "TEST_START";
export const TEST_STOP = "TEST_STOP";
export const ERROR = "ERROR";

// Change user settings
export const testRedux = () => {
    return dispatch => {
        dispatch({ type: TEST_START });
        console.log("test success");
        dispatch({ type: TEST_STOP, payload: "test Completed!" });
    }
}

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