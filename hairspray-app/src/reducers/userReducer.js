import { USER_UPDATING, USER_UPDATE_COMPLETE, TOGGLE_UPDATE_USER_FORM, GETTING_USERS,
 GOT_USERS, GETTING_SINGLE_USER, GOT_SINGLE_USER} from '../actions';

const initialState = {
  singleUser: [],
  users: [],
  updatingUser: false,
  showForm: false,
  gettingUsers: false,
  gettingSingleUser: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATING:
      return { ...state, updatingUser: true };
    case USER_UPDATE_COMPLETE:
    return {
      ...state,
      singleUser: action.payload,
      updatingNote: false
    };
    case TOGGLE_UPDATE_USER_FORM:
      return { ...state, showForm: !state.showForm };
    case GETTING_USERS:
      return {...state, gettingUsers: true}
    case GOT_USERS:
      return {...state, gettingUsers: false, users: action.payload}
    case GETTING_SINGLE_USER:
      return {...state, gettingSingleUser: true}
    case GOT_SINGLE_USER:
      return {...state, gettingSingleUser: false, singleUser: action.payload}
    default:
      return state;
  }
};
