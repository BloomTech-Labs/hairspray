import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { register } from "../actions";
class SignUp extends Component {
	handleFormSubmit = values => {
		this.props.register(values, this.props.history);
	};

	renderAlert = () => {
		if (!this.props.error) return null;
		return <h3>{this.props.error}</h3>;
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<div>
					<Link to="/signin">Sign In</Link>
				</div>
				<div className="signup-form">
					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<fieldset>
							<label>Name</label>
							<Field name="name" component="input" type="text" />
						</fieldset>
						<fieldset>
							<label>Phone</label>
							<Field name="phone" component="input" type="text" />
						</fieldset>
						<fieldset>
							<label>Email</label>
							<Field name="email" component="input" type="email" />
						</fieldset>
						<fieldset>
							<label>Password</label>
							<Field name="password" component="input" type="password" />
						</fieldset>
						<fieldset>
							<label>Confirm Password</label>
							<Field name="confirmPassword" component="input" type="password" />
						</fieldset>
						<button action="submit">Sign Up</button>
						{this.renderAlert()}
					</form>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		error: state.auth.error
	};
};

SignUp = connect(
	mapStateToProps,
	{ register }
)(SignUp);

export default reduxForm({
	form: "signup",
	fields: ["name", "phone", "email", "password", "confirmPassword"]
})(SignUp);
