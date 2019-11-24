import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions/";
import Spinner from "../../Spinner/Spinner";
import "./Appointment.css";

const services = ["Color", "Haircutting", "Makeup", "Waxing"];
const time = ["10AM to 11AM", "11AM to 12PM", "12PM to 13PM", "13PM to 14PM"];
const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class Appointment extends React.Component {
  onSubmit = formValues => {
    this.props.onCreateAppointment(
      formValues,
      this.props.userId,
      this.props.token
    );
  };

  renderSelect = ({ input, label, options, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div className="form__field-select">
          <select {...input}>
            <option value="">...</option>
            {options.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {touched && error && <div>{error}</div>}
        </div>
      </div>
    );
  };

  render() {
    let form = (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="service"
          component={this.renderSelect}
          label="Select a service"
          options={services}
          validate={[required]}
        ></Field>
        <Field
          name="time"
          component={this.renderSelect}
          label="Choose time"
          options={time}
          validate={[required]}
        ></Field>
        <div className="form__field">
          <label>Your message</label>
          <div>
            <Field
              name="message"
              component="textarea"
              type="text"
              className="form__field--text"
              placeholder=""
              validate={[alphaNumeric]}
            />
          </div>
        </div>
        <button className="form__button">Submit</button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return <div className="container">{form}</div>;
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.service) errors.service = "You have to select a service";
  if (!formValues.time) errors.time = "You have to select time";
  if (!formValues.name) errors.name = "You have to type your name";
  return errors;
};

const mapStateToProps = state => {
  return {
    loading: state.account.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateAppointment: (formValues, userId, token) =>
      dispatch(actions.createAppointment(formValues, userId, token))
  };
};

Appointment = connect(mapStateToProps, mapDispatchToProps)(Appointment);

export default reduxForm({
  form: "createAppointment",
  validate
})(Appointment);
