import { actiontype } from './actiontypes';
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

// Stylist Actions

export const getAllStylists = () => {
    return dispatch => {
      dispatch({ type: actiontype.GETTING_STYLISTS });
      axios
        .get(`${URL}/stylist`)
        .then(stylists => {
          dispatch({ type: actiontype.GOT_STYLISTS, payload: stylists.data });
        })
        .catch(err => {
          dispatch({ type: err });
        });
    };
  };
  