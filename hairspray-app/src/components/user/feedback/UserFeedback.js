import React, { Component } from "react";
import { connect } from "react-redux";
import { createFeedback, getUserAppointments } from "../../../actions";

class UserFeedback extends Component {
	constructor() {
		super();
		this.user = {};
		this.user.scores = {};
		this.user.feedback = {};
	}

	timeTrimmer(session) {
		let apptDay = session.slice(5, 7) + "/" + session.slice(8, 10);
		let apptTime = session.slice(11, 16);
		if (Number(apptTime.slice(0, 2)) > 12)
			apptTime =
				apptTime.replace(
					apptTime.slice(0, 2),
					Number(apptTime.slice(0, 2)) - 12
				) + " PM";
		else apptTime += " AM";
		return apptDay + " at " + apptTime;
	}

	handleButton(appointment) {
		console.log(appointment);
	}

	renderAppointments() {
		if (this.props.gettingAppointments) {
			return <div>Getting your Appointments</div>;
		} else {
			if (this.props.appointments === undefined) {
				return <div>Getting your Appointments</div>;
			} else {
				return this.props.appointments.map((appointment, i) => {
					return (
						<div key={i}>
							<div>{this.timeTrimmer(appointment.session)}</div>
							<div>{appointment.stylist.name}</div>
							<div>
								{appointment.service.map((el, i) => {
									return <div key={i}>{el.type + ": " + el.price}</div>;
								})}
							</div>
							<button type="button" onClick={() => this.handleButton(appointment._id)}>Leave Feedback</button>
						</div>
					);
				});
			}
		}
	}

	componentDidMount() {
		this.props.getUserAppointments();
	}

	render() {
		return (
			<div>
				<div>User Feedback</div>
				<div>{this.renderAppointments()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		feedback: state.feedback.feedback,
		appointments: state.appt.appointments.appt,
		gettingFeedback: state.feedback.gettingFeedback,
		gettingAppointments: state.appt.gettingAppointments
	};
};

export default connect(
	mapStateToProps,
	{
		createFeedback,
		getUserAppointments
	}
)(UserFeedback);
