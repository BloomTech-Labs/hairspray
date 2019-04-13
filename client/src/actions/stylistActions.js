import * as actiontype from "./actiontypes";
import axios from "axios";

const URL = "https://obscure-island-58835.herokuapp.com/api";
// const URL = "http://localhost:5000/api";

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
  