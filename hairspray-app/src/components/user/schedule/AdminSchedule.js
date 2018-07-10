import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import { getAppointmentsByDate } from "../../../actions";
import AppointmentList from './AppointmentList';

// import ApptCalendar from './ApptCalendar';
// import Side-Nav  TODO (userhome change links)


class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.date = '';
        // getDerivedStateFromProps??
    }

    // componentDidMount() {
    //     this.props.getAppointmentsByDate();
    // }

    //TODO TO GET APPTS FOR A CLICKED DATE
    onChange = (date) => {
        this.date = date.toISOString().slice(0, 10);
        this.props.getAppointmentsByDate(this.date);
        console.log(this.date);

    }

    // handleSubmit = () => {
    //     const { date } = this.state;
    //     this.props.getAppointmentsByDate(date);
    // }

    render() {
        // console.log('data', this.props.appointments); // log for data req
        // const { date } = this.state;
        // console.log('date in render:', date); // shows correct date
        {/* TODO: MAKE SURE TO USE KEY PROP */ }
        return (
            <div>
                <div className="calendar">
                    <div><strong>Calendar</strong></div>
                    <Calendar
                        onChange={value => this.onChange(value)}
                    />
                </div>

                <div className="appt-list">
                    <div>{this.props.appointments.appt && this.props.appointments.appt.map(item => <AppointmentList session={item.session} stylist={item.stylist.name} client={item.user.name} time={item.service[0].type} />)}</div>
                </div>

                {/* REMOVE */}
                {/* <div className="appt-data">
                    {this.props.appointments.appt && this.props.appointments.appt.map(item => <ul><li>{item.session}</li> <li>{item.stylist.name}</li> <li>{item.user.name}</li> <li >{item.service[0].type}</li></ul>)}
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // appt: state.appt,
        appointments: state.appt.appointments,

        // gettingAllAppointments: state.appt.gettingAllAppointments,
        gettingAppointmentsByDate: state.appt.gettingAppointmentsByDate
    }
}

export default connect(
    mapStateToProps,
    { getAppointmentsByDate }
)(AdminSchedule);