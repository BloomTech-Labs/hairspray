import React, { Component } from "react";
import { connect } from "react-redux";
import {
	setApppointment,
	getAppointmentsByDateAndStylist,
	getAllStylists
} from "../../../actions";
import Calendar from "react-calendar";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
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
		this.flag = false;
		this.open = 9;
		this.close = 21;
		this.maxDate = new Date(
			new Date().getUTCFullYear(),
			new Date().getUTCMonth() + 6
		);
		this.minDate = new Date(
			new Date().getUTCFullYear(),
			new Date().getUTCMonth(),
			new Date().getUTCDate() + 1
		);
	}

	componentDidMount() {
		this.props.getAllStylists();
	}

	toggle() {
		this.dropdownOpen === false
			? (this.dropdownOpen = true)
			: (this.dropdownOpen = false);
		this.forceUpdate();
	}

	handleStylistChild = data => {
		this.user.stylist = data;
		this.flag = false;
	};

	handleServicesChild = data => {
		this.user.service = data;
		this.forceUpdate();
	};

	handleAppointmentTimesChild = data => {
		console.log("In UserScheduling:", data);
	};

	handleTimeChange = event => {
		this.user.time = event.target.value;
		this.forceUpdate();
	};

	handleDateChange = date => {
		this.user.date = date.toISOString().slice(0, 10);
		this.flag = false;
		this.forceUpdate();
	};

	getTimes() {
		this.props.getAppointmentsByDateAndStylist(
			this.user.date,
			this.user.stylist._id
		);
		console.log("props in getTimes", this.props.appointments);
	}

	renderTimes() {
		if (this.props.appointments === undefined || this.flag === false) {
			this.flag = true;
			this.getTimes();
		}
		return <div>Times</div>;
	}

	renderAppointment() {
		return (
			<div className="appointment">
				<div className="image_container">
					{this.user.stylist.image === "" ? (
						<img
							src="https://obscure-island-58835.herokuapp.com/images/hairspray2logo.png"
							alt={this.user.stylist.name}
							className="stylist_image"
						/>
					) : (
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


// pass in appointments to child
// try to refactor appointment shower
// 

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
								<DropdownToggle
									className="scheduling__dropdown"
									value="Please Select a Stylist"
									caret
								>
									Select Stylist
								</DropdownToggle>
								<DropdownMenu>
									{this.props.gettingStylists ? (
										<DropdownItem>Getting Stylists</DropdownItem>
									) : (
										<Stylists
											stylists={this.props.stylists}
											cbFromParent={this.handleStylistChild.bind(this)}
										/>
									)}
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
							{this.user.stylist.name === "Please Select a Stylist" ||
							this.user.date === "Please Select a Date"
								? null
								: this.renderTimes()}
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
		settingAppointment: state.appt.settingAppointment,
		appointments: state.appt.appointments.appt,
		gettingAppointments: state.appt.gettingAppointments,
		gettingStylists: state.stylist.gettingStylists,
		stylists: state.stylist.stylists
	};
};

export default connect(
	mapStateToProps,
	{
		setApppointment,
		getAppointmentsByDateAndStylist,
		getAllStylists
	}
)(UserScheduling);
