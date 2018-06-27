import React, { Component } from "react";
import { connect } from "react-redux";
import {
	setApppointment,
	getAllStylists,
	getAllServices
} from "../../../actions";
import Calendar from "react-calendar";
import {
	Button,
	ButtonGroup,
	Form,
	FormGroup,
	Input,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import Stylists from './Stylists';

class UserScheduling extends Component {
	constructor() {
		super();
		this.user = {};
		this.user.stylist = { name: "Please Select a stylist", image: "" };
		this.user.date = "Please Select a Date";
		this.user.time = "Please Select a Time";
		this.user.service = "";
		this.dropdownOpen = false;
	}

	toggle() {
		this.dropdownOpen === false
			? (this.dropdownOpen = true)
			: (this.dropdownOpen = false);
		this.forceUpdate();
	}

	renderStylists() {
		if (this.props.gettingStylists) {
			return <DropdownItem>Getting Stylists</DropdownItem>;
		} else {
			return this.props.stylists.map((stylist, i) => {
				return (
					<DropdownItem onClick={this.handleStylistChange} value={i} key={i}>
						{stylist.name}
					</DropdownItem>
				);
			});
		}
	}

	handleStylistChange = event => {
		const option = event.target.value;
		if (option !== "Please Select a Stylist")
			this.user.stylist = this.props.stylists[option];
	};

	renderServices() {
		if (this.props.gettingService) {
			return <div>Getting Services</div>;
		} else {
			return (
				<ButtonGroup vertical>
					{this.props.services.map((service, i) => {
            console.log("in map",this.user.service);
						return (
							<Button
								value={i}
								key={i}
								type="button"
								onClick={this.buttonServiceHandler.bind(this)}
								active={this.user.service._id === service._id}
							>
								{service.type + ": " + service.price}
							</Button>
						);
					})}
				</ButtonGroup>
			);
		}
	}

	buttonServiceHandler(event) {
    this.user.service = this.props.services[event.target.value];
    console.log("service", this.user.service)
		this.forceUpdate();
	}

	handleTimeChange = event => {
		this.user.time = event.target.value;
		this.forceUpdate();
	};

	handleDateChange = date => {
		this.user.date = date.toISOString().slice(0, 10);
		this.forceUpdate();
	};

	componentDidMount() {
		this.props.getAllStylists();
		this.props.getAllServices();
	}

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
						<div>{this.user.service.type + ': ' + this.user.service.price}</div>
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
			this.user.services.length === 0
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
				<div className="title">Schedule Your Next Appointment</div>
				<div className="form-container">
					<Form className="form">
						<FormGroup>{this.renderServices()}</FormGroup>
						<FormGroup>
							<Dropdown
								isOpen={this.dropdownOpen}
								toggle={this.toggle.bind(this)}
							>
								<DropdownToggle value="Please Select a Stylist" caret>
									Select Stylist
								</DropdownToggle>
								<DropdownMenu>
									<Stylists stylist={this.user.stylist}/>
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
						<FormGroup>
							<Calendar
								minDetail="month"
								onChange={value => this.handleDateChange(value)}
								calendarType="US"
								// TODO: Makea max date and min date limit
							/>
							<Input onChange={this.handleTimeChange} type="time" />
						</FormGroup>
						<div className="appointment__container">
							{this.renderAppointment()}
							<Button
								className="submitButton"
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
		gettingStylists: state.stylist.gettingStylists,
		stylists: state.stylist.stylists,
		gettingService: state.services.gettingService,
		services: state.services.services
	};
};

export default connect(
	mapStateToProps,
	{
		setApppointment,
		getAllStylists,
		getAllServices
	}
)(UserScheduling);
