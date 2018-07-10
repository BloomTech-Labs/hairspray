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

  averageFeedbackScore(feedback) {
    let allfeedbackScore = (feedback.consultationScore + 
      feedback.customerserviceScore + 
      feedback.ontimeScore + 
      feedback.stylingScore +
      feedback.overallScore)/5
    
    return allfeedbackScore.toFixed(2)
  }

  renderStarRating(score) {
    let stars = [];

    for (let i = 0; i < score; i++) {
        stars.push(
            <span
                key={i}
                className="starClass"
            >
                ★
            </span>
        );
    }
    return <span>{stars}</span>;
}

	render() {
    if (this.props.gettingAllFeedbacks) {
      return <div className="adminFeedbacks">Getting All Feedbacks</div>
    } else {
      return this.props.feedbacks.map(feedback => {
        // console.log(feedback)
        return (
          <div className="adminFeedbacks">
            {this.renderStarRating(this.averageFeedbackScore(feedback))}
            <Card>                
              <CardHeader className="stylist__header">
                {feedback.overallScore + " " + feedback.appointment.stylist.name}
              </CardHeader>
              <CardBody>
                <CardText>
                  {"consultation: " + feedback.consultation} <br />
                  {"consultationScore: "} {this.renderStarRating(feedback.consultationScore)} <br />
                  {"ontime: " + feedback.ontime} <br />
                  {"ontimeScore: "} {this.renderStarRating(feedback.ontimeScore)} <br />
                  {"styling: " + feedback.styling} <br />
                  {"stylingScore: "} {this.renderStarRating(feedback.stylingScore)} <br />
                  {"customerservice: " + feedback.customerservice} <br />
                  {"customerserviceScore: "} {this.renderStarRating(feedback.customerserviceScore)} <br />
                  {"overall: " + feedback.overall} <br />
                  {"overallScore: "}{this.renderStarRating(feedback.overallScore)} <br />
                  {"date: " + feedback.date} <br />
                </CardText>
                <CardText>
                  {this.timeTrimmer(feedback.appointment.session)}
                </CardText>
                <CardTitle>
                  {feedback.appointment.user.name}
                </CardTitle>
                {/* <Button color="primary" size="sm">Delete</Button> */}
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
