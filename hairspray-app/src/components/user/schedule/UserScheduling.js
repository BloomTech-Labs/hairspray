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
import AppointmentTimes from "./AppointmentTimes";
// import AppointmentTimes from "./AppointmentTimes";

class UserScheduling extends Component {
	constructor() {
		super();
		this.user = {};
		this.user.stylist = { name: "Please Select a Stylist", image: "" };
		this.user.date = "Please Select a Date";
		this.user.time = "Please Select a Time";
		this.user.service = { _id: "", type: "Please Select a Service", price: "" };
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
		this.state = {
			dropdownOpen: false,
			user: {
				stylist: { name: "Please Select a Stylist", image: "" },
				date: "Please Select a Date",
				time: "Please Select a Time",
				service: { _id: "", type: "Please Select a Service", price: "" }
			}
		};
	}

	componentDidMount() {
		console.log(this.state);
		this.props.getAllStylists();
	}

	toggle() {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	}

	handleStylistChild = data => {
		this.user.stylist = data;
		this.setState(prevState => ({
			user: {
				...prevState.user,
				stylist: data
			}
		}));
		this.setState({ flag: false });
	};

	handleServicesChild = data => {
		this.setState(prevState => ({
			user: {
				...prevState.user,
				service: data
			}
		}));
	};

	handleAppointmentTimesChild = data => {
		console.log("In UserScheduling:", data);
	};

	handleTimeChange = event => {
		this.setState(prevState => ({
			user: {
					...prevState.user,
					time: event.target.value
			}
	}));
};

handleDateChange = date => {
	this.setState(prevState => ({
		user: {
				...prevState.user,
				date: date.toISOString().slice(0, 10)
		}
	}));
		this.setState({ flag: false });
	};

	renderAppointment() {
		return (
			<div className="appointment">
				<div className="image_container">
					{this.state.user.stylist.image === "" ? (
						<img
							src="https://obscure-island-58835.herokuapp.com/images/hairspray2logo.png"
							alt={this.state.user.stylist.name}
							className="stylist_image"
						/>
					) : (
						<img
							src={this.state.user.stylist.image}
							alt={this.state.user.stylist.name}
							className="stylist_image"
						/>
					)}
				</div>
				<div>{this.state.user.stylist.name}</div>
				<div>{this.state.user.date}</div>
				<div>{this.state.user.time}</div>
				<div>
					{this.user.service === "" ? (
						"Please select a service"
					) : (
						<div>
							{this.state.user.service.type +
								": " +
								this.state.user.service.price}
						</div>
					)}
				</div>
			</div>
		);
	}

	renderAppointmentTimes() {
		return (
			<Stylists
				stylists={this.props.stylists}
				cbFromParent={this.handleStylistChild.bind(this)}
			/>
		);
	}

	handleSubmit() {
		if (
			this.state.user.stylist === "" ||
			this.state.user.date === "" ||
			this.state.user.time === "" ||
			this.state.user.service._id === ""
		) {
			alert("All fields required!");
			return;
		}
		this.props.setApppointment({
			history: this.props.history,
			session: this.state.user.date + "T" + this.state.user.time + ":00.00Z",
			stylist: this.state.user.stylist,
			service: this.state.user.service._id
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
								isOpen={this.state.dropdownOpen}
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
										this.renderAppointmentTimes()
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
							{this.state.user.stylist.name === "Please Select a Stylist" ||
							this.state.user.date === "Please Select a Date" ? null : (
								<AppointmentTimes
									dateSelected={this.state.user.date}
									stylistSelected={this.state.user.stylist}
								/>
							)}
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
