import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import ServicesCard from "../../Card/ServicesCard";

class Services extends React.Component {
  state = {
    filteredServices: [],
    forWhom: ""
  };

  componentDidMount() {
		const { onInitServices } = this.props;
    onInitServices();
    this.setState({ forWhom: window.location.pathname });
  }

  componentDidUpdate(prevProps) {
    const { services } = this.props;
    if (prevProps.services !== services) {
      this.afterSetStateFinished(services);
    }
  }

  selectHandler(item) {
		const { forWhom } = this.state;
		const { services, onInitSelectedServices } = this.props;
		
		forWhom === "/services-for-women"
		? onInitSelectedServices(services.women[item])
		: onInitSelectedServices(services.men[item]);
  }

  afterSetStateFinished(arr) {
    const { forWhom } = this.state;

    forWhom === "/services-for-women"
      ? this.setState({ filteredServices: Object.keys(arr.women) })
      : this.setState({ filteredServices: Object.keys(arr.men) });
  }

  renderList() {
    const { filteredServices, forWhom } = this.state;

    return filteredServices.map(item => (
      <Link
        to={`${forWhom}/${item.toLowerCase()}`}
        className="services__card"
        key={item}
        onClick={() => this.selectHandler(item)}
      >
        <ServicesCard service={item} />
      </Link>
    ));
  }

  render() {
    const { forWhom } = this.state;

    return (
      <div className="container d-flex space-between f-wrap">
        <h2 className="w-100">
          {forWhom === "/services-for-women" ? "FOR WOMEN" : "FOR MEN"}
        </h2>
        {this.state.filteredServices && this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.services,
    error: state.services.error,
		isAuthenticated: state.auth.token !== null,
		selectedService: state.selectedService,
  };
};

const mapDispatchToProps = dispatch => {
  return {
		onInitServices: () => dispatch(actions.initServices()),
		onInitSelectedServices: (state) => dispatch(actions.setSelectedService(state))
    // onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
