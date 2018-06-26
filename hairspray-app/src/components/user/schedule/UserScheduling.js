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
	this.tempStylist = "Please Select a stylist";
	this.tempStylistPic = "test";
	
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
      return <div>Getting Services</div>;
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
      let elPos = this.user.services.map(x => x._id).indexOf(service._id);
      this.user.services.splice(elPos, 1);
      event.target.value = "false";
    }
    this.forceUpdate();
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
    console.log(this.user.stylist);
    this.forceUpdate();
  };

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

  changeHandler(event) {
    console.log(event.target.value);
  }

  // ===============================================
  // Current issue:
  // Cannot get stylists to appear properly when selecting from dropdown menu
  // ===============================================

  renderAppointment() {
	  let stylist = {};
    if (this.props.gettingStylists) {
    } else if (
      !this.props.gettingStylists &&
      this.tempStylist !== this.user.stylist.name
    ) {
      console.log("names are not equal", this.tempStylist, this.user.stylist.name);
    }
    console.log("after if else", this.tempStylist);
    return (
      <div>
        <div>{this.tempStylist}</div>
        <div>
          <img src={this.tempStylistPic} alt={this.tempStylist} width="200px" />
        </div>
        <div>{this.user.date}</div>
        <div>{this.user.time}</div>
        <div>
          {this.user.services.map((service, i) => (
            <div key={i}>{service.type}</div>
          ))}
        </div>
      </div>
    );
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
        {this.renderAppointment()}
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
