import React, { Component } from "react";
import { connect } from "react-redux";
import { setApppointment } from "../../../actions";
import Calendar from "react-calendar";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu
} from "reactstrap";
import Stylists from "./Stylists";
import Services from "./Services";
// import AppointmentTimes from "./AppointmentTimes";

class UserScheduling extends Component {
	constructor() {
		super();
		this.user = {};
		this.user.stylist = { name: "Please Select a Stylist", image: "" };
		this.user.date = "Please Select a Date";
		this.user.time = "Please Select a Time";
		this.user.service = { _id: "", type: "Please Select a Service", price: "" };
		this.dropdownOpen = false;
		this.maxDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 6);
		this.minDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 1);
	}

	toggle() {
		this.dropdownOpen === false
			? (this.dropdownOpen = true)
			: (this.dropdownOpen = false);
		this.forceUpdate();
	}

	handleStylistChild = data => {
		this.user.stylist = data;
	};

	handleServicesChild = data => {
		this.user.service = data;
		this.forceUpdate();
	};

	handleAppointmentTimesChild = data => {
		console.log("In UserScheduling:", data);
	}

	handleTimeChange = event => {
		this.user.time = event.target.value;
		this.forceUpdate();
	};

	handleDateChange = date => {
		this.user.date = date.toISOString().slice(0, 10);
		this.forceUpdate();
	};

	renderAppointment() {
		return (
			<div className="appointment">
				<div className="image_container">
					{this.user.stylist.image === "" ? null : (
						<img
							src={this.user.stylist.image}
							alt={this.user.stylist.name}
							className="stylist_image"
						/>
					)}
				</div>
				<div>{this.user.stylist.name}</div>
				<div>{this.user.date}</div>
				<div>{this.user.time}</div>
				<div>
					{this.user.service === "" ? (
						"Please select a service"
					) : (
						<div>{this.user.service.type + ": " + this.user.service.price}</div>
					)}
				</div>
			</div>
		);
	}

	handleSubmit() {
		if (
			this.user.stylist === "" ||
			this.user.date === "" ||
			this.user.time === "" ||
			this.user.service._id === ""
		) {
			alert("All fields required!");
			return;
		}
		this.props.setApppointment({
			history: this.props.history,
			session: this.user.date + "T" + this.user.time + ":00.00Z",
			stylist: this.user.stylist,
			service: this.user.service._id
		});
	}

	render() {
		return (
			<div className="scheduling">
				<div className="scheduling__title">Schedule Your Next Appointment</div>
				<div className="scheduling__form-container">
					<Form className="scheduling__form">
						<FormGroup>
							<Services cbFromParent={this.handleServicesChild.bind(this)} />
						</FormGroup>

						<FormGroup>
							<Dropdown
								isOpen={this.dropdownOpen}
								toggle={this.toggle.bind(this)}
								
							>
								<DropdownToggle className="scheduling__dropdown" value="Please Select a Stylist" caret>
									Select Stylist
								</DropdownToggle>
								<DropdownMenu>
									<Stylists cbFromParent={this.handleStylistChild.bind(this)} />
								</DropdownMenu>
							</Dropdown>
						</FormGroup>

						<FormGroup>
							<Calendar
								minDetail="month"
								minDate={this.minDate}
								maxDate={this.maxDate}
								onChange={value => this.handleDateChange(value)}
								calendarType="US"

								// TODO: Makea max date and min date limit
							/>
							<Input onChange={this.handleTimeChange} type="time" />
							{/* {this.user.stylist.name === "Please Select a Stylist" || this.user.date === "Please Select a Date" ? null :
							<AppointmentTimes 
							dateSelected={this.user.date}
							stylistSelected={this.user.stylist}
							flag={true}
							/>} */}
						</FormGroup>

						<div className="appointment__container">
							{this.renderAppointment()}
							<Button
								className="submit__button"
								onClick={this.handleSubmit.bind(this)}
								type="button"
							>
								Set Appointment
							</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		settingAppointment: state.appt.settingAppointment
	};
};

export default connect(
	mapStateToProps,
	{
		setApppointment
	}
)(UserScheduling);
