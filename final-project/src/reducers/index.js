import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import servicesReducer from "./servicesReducer";
import auth from "./auth";

export default combineReducers({
	// auth: authReducer,
	auth: auth,
	services: servicesReducer,
	form: formReducer,
});