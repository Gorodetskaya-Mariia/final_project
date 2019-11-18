// import axios from "../apis/instance";
import axios from "axios";

import {
	SIGN_IN,
	SIGN_OUT,
	FETCH_SERVICES,
	FETCH_SERVICE,
	CREATE_APPOINTMENT,
	DELETE_APPOINTMENT,
	EDIT_APPOINTMENT,
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL
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

export const createAppointment = formValues => async dispatch => {
	axios.post("https://react-beauty-salon-cacbe.firebaseio.com/appointments.json", formValues);
}

// export const aditAppointment = (id, formValues) => async dispatch =>{
// 	const response = await  
// }
export const authStart = () => {
	return {
		type: AUTH_START
	}
}
export const authSuccess = (authData) => {
	return {
		type: AUTH_SUCCESS,
		authData: authData
	}
}
export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error: error
	}
}

export const auth = (email, password) => async dispatch => {
	dispatch(authStart());
}