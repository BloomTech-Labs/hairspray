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

	fillWithHours() {
		this.hours = [];
		for (let i = this.open; i <= this.close; i++) {
			this.hours.push(i + ":00");
		}
	}

	componentDidMount() {
    console.log("Did Mount");
    console.log(this.dateSelected, this.props.dateSelected);
    this.dateSelected = this.props.dateSelected;
		this.stylistSelected = this.props.stylistSelected;
		this.props.getAppointmentsByDateAndStylist(
			this.dateSelected,
			this.stylistSelected._id
		);
		this.fillWithHours();
	}

	// does not rerender when recieving new props

	// componentWillReceiveProps(nextProps) {
	//   this.props.getAppointmentsByDateAndStylist(
	// 		this.dateSelected,
	// 		this.stylistSelected._id
	// 	);
	// }

	render() {
		console.log("Appointment times was rerendered");
		if (this.props.appointments === undefined)
			return <div>Checking Appointments</div>;
		else {
			console.log("props are", this.props);
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
