import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Spinner from "../../Spinner/Spinner";
import { Card } from "antd";

class Account extends React.Component {
  componentDidMount() {
    const { onFetchAppointments, token, userId } = this.props;
    onFetchAppointments(token, userId);
  }

  render() {
    let appointments = [];
    let content = <Spinner />;

    appointments = this.props.appointments.map(appointment => (
      <div
        key={appointment.id}
        className="services__card-row d-flex space-between"
      >
        <p>{appointment.service}</p>
        <p>{appointment.time}</p>
      </div>
    ));
    if (!this.props.loading) {
      content = (
        <Card title="Services" bordered={true} className="services__card">
          {appointments}
        </Card>
      );
    }

    return <div className="container d-flex justify-center">{content}</div>;
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
