// user not updating. something wrong with put method possibly

import React, { Component } from "react";
import { connect } from "react-redux";
import { userSettingsChange, toggleUpdateForm } from "../../../actions";

class UserSettingsForm extends Component {
	constructor(props) {
		super();
		this.user = props.user;
		this.userUpdates = this.user;
	}

	handleCloseButton() {
		this.props.toggleUpdateForm();
	}

	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.userUpdates[name] = value;
		console.log(this.userUpdates);
	};

	submitUpdates = () => {
		console.log("history",this.props.history);
		if (this.userUpdates.password !== this.userUpdates.confirm) {
			alert("Passwords do not match!");
			return;
		}
		this.props.userSettingsChange(this.userUpdates, this.props.history);
		alert("Changes successful!");
	};

	render() {
		return (
			<div>
				<form>
					<button type="button" onClick={this.handleCloseButton.bind(this)}> 
						Close
					</button> 
					<section>
					<label>Name</label>
					<input name="name" type="text" onChange={this.handleInputChange} />
					</section>
					<section>
					<label>Number</label>
					<input name="phone" type="text" onChange={this.handleInputChange} />
					</section>
					<section>
					<label>Email</label>
					<input name="email" type="text" onChange={this.handleInputChange} />
					</section>
					<section>
					<label>Password</label>
					<input
						name="password"
						type="password"
						onChange={this.handleInputChange}
						/>
						</section>
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
	{ userSettingsChange,
		toggleUpdateForm }
)(UserSettingsForm);
