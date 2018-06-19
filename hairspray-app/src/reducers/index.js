import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducer.js';
import { AppointmentReducer } from './appointmentReducer';
import { StylistReducer } from './stylistReducer';
import authReducer from './auth';

// import reducer for client sign ups
// import reducer for client feedback
// import reducer for admin

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  form: formReducer,
  appt: AppointmentReducer,
  stylist: StylistReducer,
  // clientSignUp
  // clientFeedbacki
  // admin
});

export default rootReducer;
