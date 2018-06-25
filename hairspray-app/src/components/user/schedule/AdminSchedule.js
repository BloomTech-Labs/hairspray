import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "react-calendar";




class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="AdminSched">
                <div>Schedule</div>
                <div>Nav Bar</div>
                <div>Calendar</div>
                <div>Appointments</div>
            </div>
        )
    }
}

export default AdminSchedule;