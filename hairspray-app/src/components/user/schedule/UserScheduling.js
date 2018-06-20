import React, { Component } from "react";
import { connect } from "react-redux";
import {
	setApppointment,
	getAllStylists,
	getAllServices
} from "../../../actions";
import Calendar from "react-calendar";

class UserScheduling extends Component {
	constructor() {
		super();
		this.user = {};
		this.user.stylist = "";
		this.user.date = "";
		this.user.time = "";
		this.user.services = [];
	}

	renderStylists() {
		if (this.props.gettingStylists) {
			return <option>Getting Stylists</option>;
		} else {
			this.user.stylist = Object.values(this.props.stylists)[0];
			return this.props.stylists.map((stylist, i) => {
				return (
					<option value={i} key={i}>
						{stylist.name}
					</option>
				);
			});
		}
	}

	renderServices() {
		if (this.props.gettingService) {
			return <button>Getting Services</button>;
		} else {
			return this.props.services.map((service, i) => {
				return (
					<button
						value="false"
						name={i}
						key={i}
						type="button"
						onClick={this.buttonServiceHandler.bind(this)}
					>
						{service.type + ": " + service.price}
					</button>
				);
			});
		}
	}

	// When a user clicks a button for a service, this either
	// adds or removes a Service object to the this.user object
	buttonServiceHandler(event) {
		if (event.target.value === "false") {
			event.target.value = "true";
			this.user.services.push(this.props.services[event.target.name]);
		} else if (event.target.value === "true") {
			const service = this.props.services[event.target.name];
			let elPos = this.user.services
			.map(x => x._id)
			.indexOf(service._id);
			this.user.services.splice(elPos, 1);
			event.target.value = "false";
		}
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
			service: this.user.services.map(el => el._id)
		});
	}

	handleStylistChange = event => {
		const option = event.target.value;
		this.user.stylist = this.props.stylists[option];
	};

	handleTimeChange = event => {
		this.user.time = event.target.value;
	};

	handleDateChange = date => {
		this.user.date = date.toISOString().slice(0, 10);
	};

	componentDidMount() {
		this.props.getAllStylists();
		this.props.getAllServices();
	}

	render() {
		return (
			<div>
				<div>User Scheduling</div>
				<div>
					<form>
						{this.renderServices()}
						<Calendar
							minDetail="month"
							onChange={value => this.handleDateChange(value)}
							calendarType="US"
							// TODO: Makea max date and min date limit
						/>
						<input onChange={this.handleTimeChange} type="time" />
						<select onChange={this.handleStylistChange}>
							{this.renderStylists()}
						</select>
						<button onClick={this.handleSubmit.bind(this)} type="button">
							Set Appointment
						</button>
					</form>
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
