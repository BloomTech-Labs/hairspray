import React, { Component } from "react";
import UserSettingsForm from "./UserSettingsForm.js";
import { connect } from "react-redux";
import { toggleUpdateForm } from '../actions';

class UserSettings extends Component {
	handleChange() {
		this.props.toggleUpdateForm();
	}

	componentDidMount() {
		console.log("the props", this.props);
	}

	changeSuccessful() {
		console.log("changes Successful");
	}

	render() {
		return (
			<div>
				{Object.entries(this.props.user).map((value, i) => {
					return (
						<div id={i} key={value[0]}>
							{value[0] + ": " + value[1]}
						</div>
					);
				})}
				<div>Password: ********</div>
				<button
					onClick={() => this.handleChange()}
				>{`Update Your Info`}</button>
				{this.props.showForm ? (
					<UserSettingsForm
						user={this.props.user}
						handleShowNote={this.props.toggleForm}
					/>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
      showForm: state.user.showForm,
    };
  };
  
  export default connect(mapStateToProps, {
    toggleUpdateForm
  })(UserSettings);