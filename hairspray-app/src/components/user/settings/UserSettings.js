import React, { Component } from "react";
import UserSettingsForm from "./UserSettingsForm.js";
import { connect } from "react-redux";
import { toggleUpdateForm, getSingleUser } from "../../../actions";
import Modal from '../../misc/Modal';

class UserSettings extends Component {
	componentDidMount() {
		this.props.getSingleUser();
	}

	handleChange() {
		this.props.toggleUpdateForm();
	}

	renderUser() {
		if (this.props.gettingUsers || this.props.user === []) {
			return <div>Getting your Info</div>;
		} else {
			return (
				<div>
					<div>Name: {this.props.user.name}</div>
					<div>Email: {this.props.user.email}</div>
					<div>Phone: {this.props.user.phone}</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="settings">
				<div>{this.renderUser()}</div>
				<div>Password: ********</div>
				<button
					onClick={() => this.handleChange()}
				>{`Update Your Info`}</button>
				{this.props.showForm ? (
					<Modal>
					<UserSettingsForm
					user={this.props.user}
					handleShowNote={this.props.toggleForm}
					history={this.props.history}
					/>
					</Modal>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		showForm: state.user.showForm,
		gettingUsers: state.user.gettingUsers,
		user: state.user.singleUser
	};
};

export default connect(
	mapStateToProps,
	{
		toggleUpdateForm,
		getSingleUser
	}
)(UserSettings);
