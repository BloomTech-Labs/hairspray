import * as actiontype from './actiontypes';
import axios from "axios";

const URL = "http://localhost:5000/api";

export const getAllServices = () => {
	return dispatch => {
		dispatch({ type: actiontype.GETTING_SERVICES });
		axios
			.get(`${URL}/service`)
			.then(services => {
				dispatch({ type: actiontype.SERVICES_GOT, payload: services.data });
			})
			.catch(err => {
				dispatch({ type: err });
			});
  }
}