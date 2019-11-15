import React from "react";
import Axios from "axios";
import ServicesCard from "../Card/ServicesCard";

class Services extends React.Component {
	state = {
    services: null,
	};
	
	componentDidMount(){
		Axios.get("https://react-beauty-salon-cacbe.firebaseio.com/services.json")
			.then(response => {
				this.setState({ services: response.data })
				console.log(this.state.services);
			});
	}

	render() {
	return (
		<div className="container d-flex space-between">
				<ServicesCard></ServicesCard>
				<ServicesCard></ServicesCard>
		</div>
	)
	}
};

export default Services;