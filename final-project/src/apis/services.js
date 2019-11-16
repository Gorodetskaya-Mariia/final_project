import axios from "axios";

const instance = axios.create({
	baseUrl:"https://react-beauty-salon-cacbe.firebaseio.com/"
});

export default instance;