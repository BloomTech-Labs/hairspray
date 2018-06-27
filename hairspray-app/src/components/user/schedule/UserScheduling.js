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

class UserScheduling extends Component {
  constructor() {
    super();
    this.user = {};
    this.user.stylist = {};
    this.user.date = "Please Select a Date";
    this.user.time = "Please Select a Time";
    this.user.services = [];
    this.stylistName = "Please Select a stylist";
    this.stylistImage = "";
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
    } else if (this.props.stylists !== undefined) {
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
    if (option !== "Please Select a Stylist") {
      this.user.stylist = this.props.stylists[option];
      this.stylistName = this.user.stylist.name;
      this.stylistImage = this.user.stylist.image;
    } else {
      this.stylistName = "Please Select a stylist";
      this.stylistImage = "";
    }
    this.forceUpdate();
  };

  renderServices() {
    if (this.props.gettingService) {
      return <div>Getting Services</div>;
    } else {
      return (
        <ButtonGroup vertical>
          {this.props.services.map((service, i) => {
            return (
              <Button
                value="false"
                name={i}
                key={i}
                type="button"
                onClick={this.buttonServiceHandler.bind(this)}
                active={this.user.services.includes(service)}
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

  renderAppointment() {
    return (
      <div className="appointment">
        <div className="image_container">
          {this.stylistImage === "" ? null : (
            <img
              src={this.stylistImage}
              alt={this.stylistName}
              className="stylist_image"
            />
          )}
        </div>
        <div>{this.stylistName}</div>
        <div>{this.user.date}</div>
        <div>{this.user.time}</div>
        <div>
          {this.user.service === [] ? (
            "Please select a service"
          ) : (
            <div>
              {this.user.services.map((service, i) => {
                if (i === 0) return service.type;
                else return ", " + service.type;
              })}
            </div>
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
      service: this.user.services.map(el => el._id)
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
                <DropdownMenu>{this.renderStylists()}</DropdownMenu>
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
