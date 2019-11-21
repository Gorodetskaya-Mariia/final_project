import axios from "axios";
import { FETCH_SERVICES_FAILED, SET_SERVICES, SET_SELECTED_SERVICE } from "./types";

export const setServices = services => {
  return {
    type: SET_SERVICES,
    services: services
  };
};

export const fetchServicesFailed = () => {
  return {
    type: FETCH_SERVICES_FAILED
  };
};

export const setSelectedService = service => {
  return {
    type: SET_SELECTED_SERVICE,
    setSelectedService: service
  };
};

export const initServices = () => dispatch => {
		axios
			.get("https://react-beauty-salon-cacbe.firebaseio.com/servicess.json")
			.then(response => JSON.stringify(response.data))
      .then(data => {
				const result = JSON.parse(data)
        dispatch(setServices(result));
      })
      .catch(error => {
				console.error(error)
        dispatch(fetchServicesFailed());
      });
};
