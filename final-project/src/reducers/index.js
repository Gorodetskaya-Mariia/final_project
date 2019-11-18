import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import servicesReducer from "./servicesReducer";

export default combineReducers({
	auth: authReducer,
	services: servicesReducer,
	form: formReducer
});