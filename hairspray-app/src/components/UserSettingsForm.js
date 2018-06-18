import React, { Component } from "react";
import { connect } from "react-redux";
import { userSettingsChange } from "../actions";

class UserSettingsForm extends Component {
	constructor() {
		super();
		this.update_name = "";
		this.update_number = "";
		this.update_email = "";
	}

	componentDidMount() {
		console.log("props in UserSettingsForm", this.props);
	}

	handleName = event => {
		this.update_name = event.target.value;
	};

	handleNumber = event => {
		this.update_number = event.target.value;
	};

	handleEmail = event => {
		this.update_email = event.target.value;
	};

	handlePassword = event => {
		this.updatePassword = event.target.value;
	};

	confirmPass = event => {
		this.handleConfirm = event.target.value;
	};

	submitUpdates = () => {
		this.props.userSettingsChange({
			id: this.props.user.id,
			name: "test",
			number: "test",
			email: "test",
			password: "test"
		});
		alert("Changes successful!");
	};

	render() {
		return (
			<div>
				<form>
					<label>Name</label>
					<input
						name="name"
						type="text"
						onChange={this.handleName}
					/>
					<label>Number</label>
					<input
						name="number"
						type="text"
						onChange={this.handleNumber}
					/>
					<label>Email</label>
					<input
						name="email"
						type="text"
						onChange={this.handleEmail}
					/>
					<label>Password</label>
					<input
						name="password"
						type="password"
						onChange={this.handlePassword}
					/>
					<label>Confirm Password</label>
					<input
						name="name"
						type="password"
						onChange={this.handleConfirm}
					/>
					<button onClick={() => this.submitUpdates()} type="button">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userReducer: state.user.updatingUser
	};
};

export default connect(
	mapStateToProps,
	{ userSettingsChange }
)(UserSettingsForm);