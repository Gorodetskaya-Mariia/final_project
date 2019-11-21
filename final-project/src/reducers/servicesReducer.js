import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
	services: null,
	error: false,
	selectedService: null
};

const setServices = (state, action) => {
	return updateObject( state, {
			services: {
				men: action.services.men,
				women: action.services.women
			},
			error: false,
	} );
};

const fetchServicesFailed = (state, action) => {
	return updateObject( state, { error: true } );
};

const setSelectedService = (state, action) => {
	return updateObject( state, {
		selectedService: action.setSelectedService
} );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
			case actionTypes.SET_SERVICES: return setServices(state, action);    
			case actionTypes.FETCH_SERVICES_FAILED: return fetchServicesFailed(state, action);
			case actionTypes.SET_SELECTED_SERVICE: return setSelectedService(state, action);
			default: return state;
	}
};

export default reducer;