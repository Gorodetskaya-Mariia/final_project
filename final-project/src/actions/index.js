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
export const authSuccess = (token, userId) => {
	return {
		type: AUTH_SUCCESS,
		idToken: token,
    userId: userId
	}
}
export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error: error
	}
}

export const auth = (email, password, isSignup) => async dispatch => {
	dispatch(authStart());
	const authData = {
		email: email,
		password: password,
		returnSecureToken: true
	};
	let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsVdWx8tfV7MlsjbEAg3Fk6zdBkrd2wKI";
	if(!isSignup){
		url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsVdWx8tfV7MlsjbEAg3Fk6zdBkrd2wKI";
	}
	axios.post(url, authData)
		.then(response => {
			dispatch(authSuccess(response.data.idToken, response.data.localId));
		})
		.catch(err=> {
			dispatch(authFail(err.response.data.error));
		});
}
