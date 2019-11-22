import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../actions";
import Spinner from "../../Spinner/Spinner";

const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength6 = minLength(6);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const password = value =>
  value !== "redux-form" ? "Invalid password" : undefined;
const tooYoung = value =>
  value && value < 18
    ? "You do not meet the minimum age requirement!"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{10})$/i.test(value)
    ? "Invalid phone number, must be 11 digits"
    : undefined;

class Auth extends React.Component {
  state = { isSignup: true };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  onSubmit = formValues => {
    this.props.onAuth(
      formValues.email,
      formValues.password,
      this.state.isSignup
    );
  };

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <div>{error}</div>) ||
              (warning && <div>{warning}</div>))}
        </div>
      </div>
    );
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    let errorMessage = null;
    let form = (
      <div>
        <Field
          name="email"
          type="email"
          component={this.renderField}
          label="Email"
          validate={[email]}
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"
          validate={[minLength6]}
        />
      </div>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthencitaced) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className="container">
        {authRedirect}
        {errorMessage}
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {form}
          {/* <Field
        name="username"
        type="text"
        component={ this.renderField }
        label="Username"
        validate={ [required, maxLength15, minLength6] }
        warn={ alphaNumeric }
      /> */}
          {/* <Field
        name="phone"
        type="number"
        component={ this.renderField }
        label="Phone number"
        validate={ [required, phoneNumber] }
      /> */}
          {/* <Field
        name="age"
        type="number"
        component={ this.renderField }
        label="Age"
        validate={ [required, number, minValue18] }
        warn={ tooYoung }
      />      */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="form__button"
            >
              Submit
            </button>
          </div>
        </form>
        <button onClick={this.switchAuthModeHandler} className="form__button">
          Switch to {this.state.isSignup ? "Sign in" : "Sign Up"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthencitaced: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default reduxForm({
  form: "auth"
})(Auth);
