import React, { Component } from "react";
import { connect } from "react-redux";
import { getfeedbacks } from "../../../actions";

class AdminFeedback extends Component {
	componentDidMount() {
    this.props.getfeedbacks();
	}

	render() {
    if (this.props.gettingAllFeedbacks) {
      return <div className="adminFeedbacks">Getting your Feedbacks</div>
    } else {
      return this.props.feedbacks.map(feedback => {
        return (
          <div className="adminFeedbacks">
            <div>{feedback.overallScore}</div>
            <div>{feedback.session.toString()}</div>
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
