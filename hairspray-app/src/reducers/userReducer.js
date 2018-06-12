import { USER_UPDATING, USER_UPDATE_COMPLETE, ERROR } from '../actions';

const initialState = {
    user: [],
    updatingUser: false,
    error: null
  };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_UPDATING:
        return { ...state, updatingUser: true };
      case USER_UPDATE_COMPLETE:
        return {
          ...state,
          user: state.user,
          updatingUser: false
        };
      case ERROR:
      console.log("ERROR OBJECT in reducer", action.payload);
        return {
          ...state,
          updatingUser: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  