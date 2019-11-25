import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../actions";
import Spinner from "../../Spinner/Spinner";
import Form from "../../Form/Form";

const required = value =>
	value || typeof value === "number" ? undefined : "Required";
	
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength6 = minLength(6);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
		: undefined;
		let FormInfo = null;

class Auth extends React.Component {
	state = { isSignup: true, flag: false };

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

		if(this.state.isSignup){
			FormInfo = (
				<div>
					<p>Please provide us information about you. The information requires for booking an appointment.</p>
			<Form newUser={true}/>
				</div>				
			);
			this.setState({flag: true});
		}
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="form__field">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <div className="error">{error}</div>))}
        </div>
      </div>
    );
  };

  render() {
    const { handleSubmit, submitting } = this.props;
		let errorMessage = null;
		let form = null;
    if(!this.state.flag) {
			form = (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="email"
          type="email"
          component={this.renderField}
          label="Email"
          validate={[email, required]}					
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"
          validate={[minLength6, required]}
        />
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
		);
			}

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated &&!this.state.isSignup) {
      authRedirect = <Redirect to="/" />;
		}

		let buttonSwitch = null;
		if(!this.props.isAuthenticated){
			buttonSwitch = <button onClick={this.switchAuthModeHandler} className="form__button">
          Switch to {this.state.isSignup ? "Sign in" : "Sign Up"}
        </button>
		}

    return (
      <div className="container--form">
        {authRedirect}
        {errorMessage}        
        {form}
				{FormInfo}
				{buttonSwitch}       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
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
