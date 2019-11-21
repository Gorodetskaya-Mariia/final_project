import axios from "../apis/instance";
import {
	SIGN_IN,
	SIGN_OUT
} from "./types";

export {
	auth,
	logout,
	// setAuthRedirectPath,
	// authCheckState
} from './auth';

export {
	initServices,
	setSelectedService
} from './services';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	}
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const fetchServices = ()=> async dispatch => {
// 	const services = await Axios.get("https://react-beauty-salon-cacbe.firebaseio.com/services.json")
// 	.then(response => {
// 				return response.data });

// 				console.log(data);

// 	const response = await services.get("/services");

// 	dispatch({ type: FETCH_SERVICES, payload: services });
}

export const createAppointment = formValues => async dispatch => {
	axios.post("https://react-beauty-salon-cacbe.firebaseio.com/appointments.json", formValues);
}
