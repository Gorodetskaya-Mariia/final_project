import axios from 'axios';
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_LOGOUT
} from "./types";

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

export const logout = () => {
	return {
		type: AUTH_LOGOUT
	}
}
export const checkAuthTimeout = (expirationTime) => async dispatch => {
	setTimeout(() => {
		dispatch(logout());
	}, expirationTime*1000);
}

export const auth = (email, password, isSignup) => async dispatch => {
	dispatch(authStart());
	const authData = {
		email: email,
		password: password,
		returnSecureToken: true
	}
	let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsVdWx8tfV7MlsjbEAg3Fk6zdBkrd2wKI";
	if(!isSignup){
		url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsVdWx8tfV7MlsjbEAg3Fk6zdBkrd2wKI";
	}
	axios.post(url, authData)
		.then(response => {
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(err=> {
			dispatch(authFail(err));
		});
}