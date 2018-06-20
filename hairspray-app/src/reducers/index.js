import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from './userReducer.js';
import { AppointmentReducer } from './appointmentReducer';
import { StylistReducer } from './stylistReducer';
import { ServicesReducer } from './servicesReducer';
import authReducer from './auth';

// import reducer for client feedback
// import reducer for admin

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  form: formReducer,
  appt: AppointmentReducer,
  stylist: StylistReducer,
  services: ServicesReducer,
  // clientFeedback
  // admin
});

export default rootReducer;
