import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "antd";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        Home
        {this.props.isAuthencitaced ? (
          <Link to="/appointment">
            <Button type="primary" size={"large"}>
              Book an appointment
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button type="primary" size={"large"}>
              Sign up for booking
            </Button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthencitaced: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Home);
