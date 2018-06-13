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
		this.updateName = event.target.value;
	};

	submitUpdates = () => {
		this.props.userSettingsChange({
		});
	};

	render() {
		return (
			<div>
				<form>
					<label>Name</label>
					<input
						value={this.props.user.name}
						name="name"
						type="text"
						onChange={this.handleName}
						placeholder={this.props.user.name}
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
