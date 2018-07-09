import React, { Component } from "react";
import { connect } from "react-redux";
import { getfeedbacks } from "../../../actions";
import {
  Button,
  Card,
  CardText,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";

class AdminFeedback extends Component {
	componentDidMount() {
    this.props.getfeedbacks();
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

 
	render() {
    if (this.props.gettingAllFeedbacks) {
      return <div className="adminFeedbacks">Getting All Feedbacks</div>
    } else {
      return this.props.feedbacks.map(feedback => {
        console.log(feedback)
        return (
          <div className="adminFeedbacks">
            <Card>                
              <CardHeader className="stylist__header">
                {feedback.overallScore + " " + feedback.appointment.stylist.name}
              </CardHeader>
              <CardBody>
                {}
                <CardText>
                  test text here
                </CardText>
                <CardText>
                {this.timeTrimmer(feedback.appointment.session)}
                </CardText>
                <CardTitle>
                {feedback.appointment.user.name}
                </CardTitle>
                <Button color="primary" size="sm">Delete</Button>
              </CardBody>
            </Card>
          </div>
        )
      })
    }
  }

  
}



const mapStateToProps = state => {
	return {
    feedbacks: state.feedback.feedbacks,
    gettingAllFeedbacks: state.feedback.gettingAllFeedbacks
	};
};

export default connect(
	mapStateToProps,
	{
    getfeedbacks
  }
)(AdminFeedback);
