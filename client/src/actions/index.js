import { actiontype } from './actiontypes';
export * from './userActions';
export * from './serviceActions';
export * from './feedbackActions';
export * from './appointmentActions';
export * from './stylistActions';


// const URL = process.env.REACT_APP_API_URL;

export const authError = error => {
  return {
    type: actiontype.AUTHENTICATION_ERROR,
    payload: error
  };
};
