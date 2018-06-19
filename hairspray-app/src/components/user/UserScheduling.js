import React, { Component } from "react";
import { connect } from "react-redux";
import { setApppointment, getAllStylists } from "../../actions";

class UserScheduling extends Component {
	constructor() {
		super();
		this.userstylist = "";
		this.userdate = "";
		this.usertime = "";
		this.date = {};
		this.session = "";
	}

	renderStylists() {
		if (this.props.gettingStylists) {
			return <option>Getting Stylists</option>;
		} else {
			this.userstylist = Object.values(this.props.stylists)[0];
			return this.props.stylists.map((stylist, i) => {
				return <option value={i} key={i}>{stylist.name}</option>;
			});
		}
	}

	handleSubmit() {
		if (
			this.userstylist === "" ||
			this.userdate === "" ||
			this.usertime === ""
		) {
			alert("All fields required!");
			return;
		}
		this.session = this.userdate + "T" + this.usertime + ":00.00Z";
		this.props.setApppointment({
			session: this.session,
			stylist: this.userstylist
		});
	}

	handleStylistChange = event => {
		const option = event.target.value;
		this.userstylist = this.props.stylists[option]._id;
	};

	handleTimeChange = event => {
		this.usertime = event.target.value;
		console.log(this.usertime);
	};

	handleDateChange = event => {
		this.userdate = event.target.value;
		console.log(this.userdate);
	};

	componentDidMount() {
		this.props.getAllStylists();
	}

	render() {
		return (
			<div>
				<div>User Scheduling</div>
				<div>
					<label>Date</label>
					<form>
						<input onChange={this.handleDateChange} type="date" />
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
		stylists: state.stylist.stylists
	};
};

export default connect(
	mapStateToProps,
	{
		setApppointment,
		getAllStylists
	}
)(UserScheduling);
