import { FETCH_SERVICES } from "../actions/types.js";

export default (state = {}, action) => {
	switch(action.type){
		case FETCH_SERVICES:
			return { ...state};
		default:
			return state;
	}
}