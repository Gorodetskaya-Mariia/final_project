import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import "./ServiceDetail.css";

class ServiceDetail extends React.Component {
  renderList() {
    const { selectedService } = this.props.services;
    let filteredArray = Object.keys(selectedService);
    let result = [];
    for (let item in filteredArray) {
      if (filteredArray[item] !== "description") {
        result.push(filteredArray[item]);
      }
    }

    return result.map(item => (
      <div className="service__item d-flex align-items-center" key={item}>
        <p className="service__name">{item}</p>
        <p className="service__price">{`from $${selectedService[item].price}`}</p>
        <div className="service__buttons d-flex">
          <Button type="primary" className="service__buttons--book">
            Book
          </Button>
          <Button type="danger">Cancel</Button>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="service__wrapper d-flex">
          <img
            className="service__image"
            alt=""
            src="https://www.beinspiredsalon.com/wp-content/uploads/2015/05/COLOR-services-420x561.jpg"
          />
          <div className="service__list d-flex flex-column">
            <div className="service__description">
              {this.props.services.selectedService.description}
            </div>
            {this.props.services.selectedService && this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services
  };
};

export default connect(mapStateToProps)(ServiceDetail);
