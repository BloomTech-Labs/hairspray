import { USER_UPDATING, USER_UPDATE_COMPLETE, TOGGLE_UPDATE_USER_FORM, GETTING_USERS,
 GOT_USERS} from '../actions';

const initialState = {
  user: [],
  users: [],
  updatingUser: false,
  showForm: false,
  gettingUsers: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATING:
      return { ...state, updatingUser: true };
    case USER_UPDATE_COMPLETE:
    return {
      ...state,
      user: action.payload,
      updatingNote: false
    };
    case TOGGLE_UPDATE_USER_FORM:
      return { ...state, showForm: !state.showForm };
    case GETTING_USERS:
      return {...state, gettingUsers: true}
    case GOT_USERS:
    console.log("payload",action.payload);
      return {...state, gettingUsers: false, users: action.payload}
    default:
      return state;
  }
};
