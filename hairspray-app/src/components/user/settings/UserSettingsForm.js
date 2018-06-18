import React, { Component } from "react";
import { connect } from "react-redux";
import { userSettingsChange } from "../../../actions";

class UserSettingsForm extends Component {
	componentDidMount() {}

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(this.state);
	};

	submitUpdates = () => {
		if (this.state.password !== this.state.confirm) {
			alert("Passwords do not match!");
			return;
		}
		this.props.userSettingsChange(this.state);
		alert("Changes successful!");
	};

	render() {
		return (
			<div>
				<form>
					<label>Name</label>
					<input name="name" type="text" onChange={this.handleInputChange} />
					<label>Number</label>
					<input name="number" type="text" onChange={this.handleInputChange} />
					<label>Email</label>
					<input name="email" type="text" onChange={this.handleInputChange} />
					<label>Password</label>
					<input
						name="password"
						type="password"
						onChange={this.handleInputChange}
					/>
					<label>Confirm Password</label>
					<input
						name="confirm"
						type="password"
						onChange={this.handleInputChange}
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
