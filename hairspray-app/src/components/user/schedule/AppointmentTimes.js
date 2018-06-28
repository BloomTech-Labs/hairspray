import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllAppointments } from "../../../actions";

class AppointmentTimes extends Component {
  constructor(props) {
    super();
    this.dateSelected = props.dateSelected; 
  }

  componentDidMount() {

  }

  render() {
    console.log("props are", this.props.dateSelected);
    return <div>Appointment Times</div>
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
    getAllAppointments
	}
)(AppointmentTimes);


/*  Show days that have appointments taken
**
**  From server =>
**  search all appointments in database for a session that includes date
**