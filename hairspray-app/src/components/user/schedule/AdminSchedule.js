import React, { Component } from "react";
// import { connect } from "react-redux";  **temporary remove
import Calendar from "react-calendar";

import { Nav, NavItem, NavLink } from 'reactstrap'; // Side Nav
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'; // Breadcrumbs

class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "8:00 AM",
            sylist: "Ariel",
            client: "Cindy",
            service: "Cut & Color"
        }
    }
    render() {
        return (
            <div className="admin-schedule">
                <div><strong>Schedule</strong></div>
                <div className="bread-crumbs">
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Schedule</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="side-nav">
                    <Nav vertical>
                        <NavLink href="#">Schedule</NavLink>
                        <NavLink href="#">Feedback</NavLink>
                        <NavLink href="#">Billing</NavLink>
                        <NavLink href="#">Settings</NavLink>
                    </Nav>
                </div>
                <div className="calendar">
                    <div><strong>Calendar</strong></div>
                    <Calendar />
                </div>
                <div className="appointments">
                    <div><strong>Appointments</strong></div>
                    <div>{this.state.time}</div>
                    <div>Stylist: {this.state.sylist}</div>
                    <div>Client: {this.state.client}</div>
                    <div>Service: {this.state.service}</div>
                </div>
            </div>
        )
    }
}

export default AdminSchedule;