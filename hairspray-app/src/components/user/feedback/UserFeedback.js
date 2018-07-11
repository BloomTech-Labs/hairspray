import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createFeedback,
  getUserAppointments,
  toggleFeedbackForm
} from "../../../actions";
import FeedbackForm from "./feedbackForm";
import Modal from "../../misc/Modal";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  Button
} from "reactstrap";

class UserFeedback extends Component {
  constructor() {
    super();
    this.user = {};
    this.user.scores = {};
    this.user.feedback = {};
    this.apppointment = "";
  }

  timeTrimmer(session) {
    let apptDay = session.slice(5, 7) + "/" + session.slice(8, 10);
    let apptTime = session.slice(11, 16);
    if (Number(apptTime.slice(0, 2)) > 12)
      apptTime =
        apptTime.replace(
          apptTime.slice(0, 2),
          Number(apptTime.slice(0, 2)) - 12
        ) + " PM";
    else apptTime += " AM";
    return apptDay + " at " + apptTime;
  }

  handleButton(appointment) {
    this.apppointment = appointment;
    this.props.toggleFeedbackForm();
  }

  renderAppointments() {
    if (
      this.props.gettingAppointments ||
      this.props.appointments === undefined
    ) {
      return <div>Getting your Appointments</div>;
    } else {
      return this.props.appointments.map((appointment, i) => {
        return (
          <div className="feedback__card" key={i}>
            <Card>
              <CardHeader className="feedback__card__header">
                {this.timeTrimmer(appointment.session)}
              </CardHeader>
              <CardBody className="feedback__card__body">
                <CardTitle>{"Stylist: " + appointment.stylist.name}</CardTitle>
                <CardText>
                  {appointment.service.map((el, i) => {
                    return <div key={i}>{el.type + ": " + el.price}</div>;
                  })}
                </CardText>
                <Button
                  className="feedback__card__button"
                  type="button"
                  onClick={() => this.handleButton(appointment._id)}
                >
                  Leave Feedback
                </Button>
              </CardBody>
            </Card>
          </div>
        );
      });
    }
  }

  componentDidMount() {
    this.props.getUserAppointments();
  }

  render() {
    return (
      <div className="feedback">
        <div className="feedback__title">
          Leave Feedback For Your Appoinments
        </div>
        {this.props.showFeedbackForm ? (
          <Modal>
            <FeedbackForm appointment={this.apppointment} />
          </Modal>
        ) : null}
        <div className="feedback__container">{this.renderAppointments()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feedback: state.feedback.feedback,
    appointments: state.appt.appointments.appt,
    gettingFeedback: state.feedback.gettingFeedback,
    gettingAppointments: state.appt.gettingAppointments,
    showFeedbackForm: state.feedback.showFeedbackForm
  };
};

export default connect(
  mapStateToProps,
  {
    createFeedback,
    getUserAppointments,
    toggleFeedbackForm
  }
)(UserFeedback);
