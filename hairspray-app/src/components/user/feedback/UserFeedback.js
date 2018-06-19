import React, { Component } from "react";
import { connect } from "react-redux";
import { createFeedback } from "../../../actions";

class UserFeedback extends Component {
  constructor() {
    super();
    this.feedback = "";
    this.appointmentID = "";
  }

  componentDidMount() {
    this.appointmentID = this.props.match.params.id;
  }

	render() {
    console.log(this.appointmentID);
    return (
			<div>
				<div>User Feedback</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
    feedback: state.feedback.feedback,
    gettingFeedback: state.feedback.gettingFeedback
	};
};

export default connect(
	mapStateToProps,
	{
		createFeedback
	}
)(UserFeedback);
