import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { testReducer } from './test.js';
// import reducer for client sign ups
// import reducer for client feedback
// import reducer for admin 


const rootReducer = combineReducers({
    user: userReducer,
    test: testReducer,

    // clientSignUp
    // clientFeedbacki
    // admin

});

export default rootReducer;