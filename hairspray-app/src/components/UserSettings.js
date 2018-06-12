import React, { Component } from "react";

export default class UserSettings extends Component {
	handleChange(value) {
		if (value === "password")
			console.log("Clicked button containing a password: ", value);
		console.log("Clicked button containing not a password:", value);
		// open form
		// take value and submit to state change function
		// recieve response upon success and generate success message
		this.changeSuccessful();
	}

	changeSuccessful() {
		console.log("changes Successful");
	}

	render() {
		return (
			<div>
				<div>
					<div>
						Name: {this.props.user.name}
						<button onClick={() => this.handleChange(this.props.user.name)}>
							Edit
						</button>
					</div>
				</div>
				<div>
					<div>
						Email: {this.props.user.email}{" "}
						<button onClick={() => this.handleChange(this.props.user.email)}>
							Edit
						</button>
					</div>
				</div>
				<div>
					<div>
						Number: {this.props.user.number}{" "}
						<button onClick={() => this.handleChange(this.props.user.number)}>
							Edit
						</button>
					</div>
				</div>
				<div>
					<div>
						Password: ********{" "}
						<button onClick={() => this.handleChange("Password")}>Edit</button>
					</div>
				</div>
			</div>
		);
	}
}
