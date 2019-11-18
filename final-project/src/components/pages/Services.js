import React from "react";
import Axios from "axios";
import ServicesCard from "../Card/ServicesCard";

class Services extends React.Component {
  state = {
    services: [],
		filteredServices: [],
		forWhom: ''
  };

  componentDidMount() {
  	Axios
		.get("https://react-beauty-salon-cacbe.firebaseio.com/servicess.json")
		.then(response => {
      this.setState({
				services: response.data,
				forWhom: window.location.pathname,
			}, () => {
				this.afterSetStateFinished(this.state.services);
			});
    });
	}
	
	afterSetStateFinished(arr) {
		const { forWhom } = this.state;
		forWhom === '/services-for-women'
			? this.setState({filteredServices: Object.keys(arr.women)})
			: this.setState({filteredServices: Object.keys(arr.men)})
	}

  renderList() {
		const { filteredServices, forWhom } = this.state;
    return filteredServices.map(item => {
      return (
				<ServicesCard
					key={ item }
					service={ item }
					forWhom={ forWhom }
				/>
      );
    });
	}
	
  render() {
		const {filteredServices, forWhom} = this.state;

    return (
      <div className="container d-flex space-between f-wrap">
          <h2 className="w-100">
						{
							forWhom === "/services-for-women"
								? "FOR WOMEN"
								: "FOR MEN"
						}
					</h2>
					{filteredServices.length && this.renderList()}
  
      </div>
    );
  }
}

export default Services;
