import React, { Component } from "react";
import { connect } from "react-redux";
import { getAppointmentsByDateAndStylist } from "../../../actions";
import { Button } from "reactstrap";

class AppointmentTimes extends Component {
	constructor(props) {
		super();
		this.dateSelected = "";
		this.stylistSelected = "";
		this.renderFlag = props.flag;
		this.hours = [];
		this.open = 9;
		this.close = 21;
		this.unavailableHours = [];
		this.state = {
			dateSelected: props.dateSelected,
			stylistSelected: props.stylistSelected,
			inherited: props,
			appointments: props.appointments
		};

		this.updateAppointments = this.updateAppointments.bind(this);
	}

	renderAvailableTimeslots() {
		if (this.props.appointments !== undefined) {
			this.unavailableHours = [];
			this.props.appointments.forEach(el => {
				this.unavailableHours.push(el.session.slice(11, 13) + ":00");
			});
			for (let i = this.hours.length - 1; i >= 0; i--) {
				if (this.unavailableHours.indexOf(this.hours[i]) > -1)
					this.hours.splice(i, 1);
			}
			return this.hours.map((hour, i) => {
				return (
					<div key={i}>
						<Button>{hour}</Button>
					</div>
				);
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(JSON.stringify(this.props.stylistSelected) !== JSON.stringify(nextProps.stylistSelected) || JSON.stringify(this.props.dateSelected) !== JSON.stringify(nextProps.dateSelected)) {
		this.setState({
			dateSelected: nextProps.dateSelected,
			stylistSelected: nextProps.stylistSelected,
			inherited: nextProps,
		})
		this.props.getAppointmentsByDateAndStylist(
			this.props.dateSelected,
			this.props.stylistSelected._id
		);
			this.setState({ appointments: nextProps.appointments });
			this.fillWithHours();
		}

	}

	updateAppointments() {
		this.props.getAppointmentsByDateAndStylist(
			this.props.dateSelected,
			this.props.stylistSelected._id
		);
		this.fillWithHours();
	}

	fillWithHours() {
		this.hours = [];
		for (let i = this.open; i <= this.close; i++) {
			this.hours.push(i + ":00");
		}
	}

	componentDidMount() {
		this.updateAppointments();
	}

	render() {
		console.log("state props", this.state.inherited);
		console.log("Appointment times was rendered");
		if (this.props.appointments === undefined)
			return <div>Checking Appointments</div>;
		else {
			return (
				<div>
					<div>Available Times:</div>
					<div>{this.renderAvailableTimeslots()}</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		appointments: state.appt.appointments.appt,
		gettingAppointments: state.appt.gettingAppointments
	};
};

export default connect(
	mapStateToProps,
	{
		getAppointmentsByDateAndStylist
	}
)(AppointmentTimes);
