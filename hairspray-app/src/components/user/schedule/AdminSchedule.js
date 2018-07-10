import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import { getAppointmentsByDate } from "../../../actions";
import AppointmentList from "./AppointmentList";
import UserHome from "../UserHome";
import PropTypes from "prop-types";

class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.date = "";
    }

    onChange = (date) => {
        this.date = date.toISOString().slice(0, 10);
        this.props.getAppointmentsByDate(this.date);
    }

    render() {

        return (
            <div>
                <div className="side-nav-bar">
                    <UserHome />
                </div>
                <div className="calendar">
                    <Calendar
                        onChange={value => this.onChange(value)}
                    />
                </div>

                <div className="appt-list">
                    {this.props.appointments.appt && this.props.appointments.appt.map((appointment, item) => <AppointmentList key={item} session={appointment.session} stylist={appointment.stylist.name} client={appointment.user.name} time={appointment.service[0].type} />)}
                </div>
            </div>
        )
    }
}

AdminSchedule.propTypes = {
    appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
    gettingAppointmentsByDate: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        appointments: state.appt.appointments,
        gettingAppointmentsByDate: state.appt.gettingAppointmentsByDate
    }
}

export default connect(
    mapStateToProps,
    { getAppointmentsByDate }
)(AdminSchedule);