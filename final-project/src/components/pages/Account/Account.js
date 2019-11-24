import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Spinner from "../../Spinner/Spinner";
import { Card } from "antd";
import { Button } from "antd";
import "./Account.css";

class Account extends React.Component {
  componentDidMount() {
    const { onFetchAppointments, token, userId } = this.props;
    onFetchAppointments(token, userId);
  }

  onDeleteHandeler = () => {};

  render() {
    let appointments = [];
    let content = <Spinner />;

    appointments = this.props.appointments.map(appointment => (
      <div
        key={appointment.id}
        className="account__card-row d-flex space-between align-items-center"
      >
        <p>{appointment.service}</p>
        <p>{appointment.time}</p>
        <Button type="danger" onClick={this.onDeleteHandeler}>
          Delete
        </Button>
      </div>
    ));
    if (!this.props.loading) {
      content = (
        <div className="container container--account d-flex justify-center">
          <Card title="Services" bordered={true} className="account__card">
            {appointments}
          </Card>
          <Card
            title="Personal information"
            bordered={true}
            className="account__card"
          ></Card>
        </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    appointments: state.account.appointments,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAppointments: (token, userId) =>
      dispatch(actions.fetchAppointments(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
