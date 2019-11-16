import services from "../apis/services";
import Axios from "axios";
import {
	SIGN_IN,
	SIGN_OUT,
	FETCH_SERVICES,
	FETCH_SERVICE,
	CREATE_APPOINTMENT,
	DELETE_APPOINTMENT,
	EDIT_APPOINTMENT
} from "./types";
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

export const fetchService = (name) => async dispatch => {
	const response = await services.get(`/services/${name}`);

	dispatch({ type: FETCH_SERVICE, payload: response.data });
}

// export const aditAppointment = (id, formValues) => async dispatch =>{
// 	const response = await  
// }