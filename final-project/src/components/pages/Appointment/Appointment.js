import React from "react";
import { Field, reduxForm } from "redux-form";
import "./Appointment.css"

const services = ["Color", "Haircutting", "Makeup", "Waxing"];
const time = ['10AM to 11AM', '11AM to 12PM', '12PM to 13PM', '13PM to 14PM'];
class Appointment extends React.Component {

	onSubmit(formValues){
	}

	renderError = ({ error, touched })=> {
		if(touched && error){
		return <div className="error">{ error }</div>
		}
	}

	renderSelect = ({ input, label, options, meta }) => {
		return (
			<div className="form__field">
        <label>{ label }</label>
				<div className="form__field-select">
					<select { ...input }>
					<option value="">...</option>
					{options.map(option => (
              <option value={ option } key={ option }>
                { option }
              </option>
            ))}
						</select>
						{ this.renderError(meta) }
				</div>			
			</div>
		)
	}

  render() {
    return (
			
      <div className="container">
				<form onSubmit={ this.props.handleSubmit(this.onSubmit) }>
            <Field name="service" component={ this.renderSelect } label="Select a service" options={ services }>
            </Field>
            <Field name="time" component={ this.renderSelect } label="Choose time" options={ time }>
            </Field>
				<div className="form__field">
        <label>Your message</label>
        <div>
          <Field
            name="message"
						component="textarea"						
						type="text"
						className="form__field--text"
            placeholder=""
          />
        </div>
      </div>
			<button className="form__button">Submit</button>
			</form>
      </div>
    );
  }
}

const validate = formValues => {
	const errors = {};
	if(!formValues.service) errors.service = "You have to select a service";
	if(!formValues.time) errors.time = "You have to select time";
	return errors;
} 

export default reduxForm({
	form: "appointmentCreate",
	validate: validate
})(Appointment);
