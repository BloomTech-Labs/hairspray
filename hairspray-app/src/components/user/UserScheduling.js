import React, { Component } from "react";

export default class UserScheduling extends Component {
	render() {
		return (
			<div>
				<div>User Scheduling</div>
				<div>
					<field>Date</field>
					<input type="date" />
					<input type="time" />
				</div>
			</div>
		);
	}
}
