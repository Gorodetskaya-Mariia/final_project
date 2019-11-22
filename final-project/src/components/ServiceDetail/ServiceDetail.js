import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import "./ServiceDetail.css";

class ServiceDetail extends React.Component {
  onBookHandeler = () => {
    this.props.history.push("/appointment");
  };

  onCancelHandeler = () => {
    this.props.history.push("/account");
  };

  onSignupHandeler = () => {
    this.props.history.push("/login");
  };

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
          <Button
            type="primary"
            disabled={!this.props.isAuthencitaced}
            className="service__buttons--book"
            onClick={this.onBookHandeler}
          >
            Book
          </Button>
          <Button
            type="danger"
            disabled={!this.props.isAuthencitaced}
            onClick={this.onCancelHandeler}
          >
            Cancel
          </Button>
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
              {" "}
              {this.props.services.selectedService.description}
            </div>
            {this.props.services.selectedService && this.renderList()}
          </div>
        </div>
        {!this.props.isAuthencitaced && (
          <div>
            Booking is available only for authencitaced customers. If you want
            to book an appointment please
            <span onClick={this.onSignupHandeler} className="service__info">
              {" "}
              click for sign up
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services,
    isAuthencitaced: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(ServiceDetail);
