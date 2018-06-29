// user not updating. something wrong with put method possibly

import React, { Component } from "react";
import { connect } from "react-redux";
import { userSettingsChange, toggleUpdateForm } from "../../../actions";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col
} from "reactstrap";

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
	};

	submitUpdates = () => {
		if (this.userUpdates.password !== this.userUpdates.confirm) {
			alert("Passwords do not match!");
			return;
		}
		this.props.userSettingsChange(this.userUpdates, this.props.history);
		alert("Changes successful!");
	};

	render() {
		return (
			<div className="form__container">
				<div className="close" onClick={this.handleCloseButton.bind(this)}>
					✖
				</div>
				<Form className="form">
					<FormGroup row>
						<Label sm={2}>Name</Label>
						<Col sm={5}>
							<Input
								name="name"
								type="text"
								onChange={this.handleInputChange}
								className="input__box1"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Number</Label>
						<Col sm={10}>
							<Input
								name="phone"
								type="text"
								onChange={this.handleInputChange}
								className="input__box"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Email</Label>
						<Col sm={10}>
							<Input
								name="email"
								type="text"
								onChange={this.handleInputChange}
								className="input__box"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Password</Label>
						<Col sm={10}>
							<Input
								name="password"
								type="password"
								onChange={this.handleInputChange}
								className="input__box"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Confirm Password</Label>
						<Col sm={10}>
							<Input
								name="confirm"
								type="password"
								onChange={this.handleInputChange}
								className="input__box"
							/>
						</Col>
					</FormGroup>
					<Button
						className="reactStrap__button"
						onClick={() => this.submitUpdates()}
						type="button"
					>
						Submit
					</Button>
				</Form>
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
	{
		userSettingsChange,
		toggleUpdateForm
	}
)(UserSettingsForm);
