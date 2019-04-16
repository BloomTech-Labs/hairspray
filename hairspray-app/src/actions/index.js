import * as actiontype from './actiontypes';
export * from './actiontypes';
export * from './userActions';
export * from './serviceActions';
export * from './feedbackActions';
export * from './appointmentActions';
export * from './stylistActions';


// const URL = "https://obscure-island-58835.herokuapp.com/api";
// const URL = "http://localhost:5000/api";

// The list of action variables was getting very long,
// so I moved them all to a seperate file 'actiontypes.js'
// if you need to add action variables, do so in that file
// and them import them here by preceding the variable with
// 'actiontype.' example: actiontype.GOT_STYLIST

export const authError = error => {
  return {
    type: actiontype.AUTHENTICATION_ERROR,
    payload: error
  };
};
