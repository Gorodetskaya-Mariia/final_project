import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Spinner from "../../Spinner/Spinner";
import Form from "../../Form/Form";
import axios from "axios";
import { Card } from "antd";
import { Button } from "antd";
import "./Account.css";

class Account extends React.Component {
  state = { onChange: false };

  componentDidMount() {
    const { onFetchAppointments, onFetchUserData, token, userId } = this.props;
    onFetchAppointments(token, userId);
    onFetchUserData(token, userId);
	}

  onDeleteHandler = (e) => {
		const { onFetchAppointments, token, userId } = this.props;
		const id = e.target.getAttribute('data-id');
		axios.delete(`https://react-beauty-salon-cacbe.firebaseio.com/appointments/${id}.json?auth=${this.props.token}`)
      .then(res => {
				onFetchAppointments(token, userId);
			})
			.catch((err) => console.warn(err))
	};

  onChangeDataHandler = () => {
    this.setState({ onChange: true });
  };

  render() {
    let appointmentsList = [];
    let userDataList = [];
    let form = null;
    let content = <Spinner />;
    const { appointments, userData } = this.props;
    const { onChange } = this.state;

    if (onChange) {
      form = <Form newUser={false} />;
    }

    appointmentsList = appointments.map(appointment => (
      <div
        key={appointment.id}
        className="account__card-row d-flex space-between align-items-center"
      >
        <p>{appointment.service}</p>
        <p>{appointment.time}</p>
        <Button type="danger" data-id={appointment.id} onClick={this.onDeleteHandler}>
          Delete
        </Button>
      </div>
    ));

		if(userData.length){
			userDataList = userData.map(item => (
				<div key={item.id ? item.id : null} className="account__card-row d-flex flex-column">
					<div className="account__card-item">
						<strong>Your name </strong>
						<span>{item.username ? item.username : "Please"}</span>
					</div>
					<div className="account__card-item">
						<strong>Phone number: </strong>
						<span>{item.username ? item.phone : "Please"}</span>
					</div>
					<Button type="primary" onClick={this.onChangeDataHandler}>
						Change data
					</Button>
					{form}
				</div>
			));
		}	else {
			userDataList = (
				<div>
					<div>Please fill the form bellow. The information requires for booking an appointment.</div>
					<Form newUser={false} />
				</div>
			)
		}	

    if (!this.props.loading) {
      content = (
        <div className="container--account d-flex justify-center">
          <Card title="Services" bordered={true} className="account__card">
            {appointmentsList}
          </Card>
          <Card
            title="Personal information"
            bordered={true}
            className="account__card"
          >
            {userDataList}
          </Card>
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
    userId: state.auth.userId,
    userData: state.userData.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAppointments: (token, userId) =>
      dispatch(actions.fetchAppointments(token, userId)),
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
