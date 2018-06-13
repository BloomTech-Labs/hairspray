import { USER_UPDATING, USER_UPDATE_COMPLETE, TOGGLE_UPDATE_USER_FORM } from '../actions';

const initialState = {
    user: [],
    updatingUser: false,
    showForm: false
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
      case TOGGLE_UPDATE_USER_FORM:
        return { ...state, showForm: !state.showForm };
      default:
        return state;
    }
  };
  