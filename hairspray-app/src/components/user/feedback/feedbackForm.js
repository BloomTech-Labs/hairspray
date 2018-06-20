import React, { Component } from "react";
import { connect } from "react-redux";
import { createFeedback, toggleFeedbackForm } from "../../../actions";

class FeedbackForm extends Component {
	constructor(props) {
		super();
		this.user = {};
		this.user.scores = {};
		this.user.feedback = {};
		this.appointment = props.appointment;
	}

	closeModal() {
		this.props.toggleFeedbackForm();
	}

	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.user.feedback[name] = value;
	};

	submitUpdates = () => {
		console.log(this.props.appointment, this.user.scores, this.user.feedback);
		this.props.createFeedback(
			this.props.appointment,
			this.user.scores,
			this.user.feedback
		);
	};

	handleStarClick(star, label) {
		this.user.scores[label] = star;
		console.log(this.user)
  }
  
  handleStarChange() {
    //change color of star here
  }

	renderStarRating(label) {
		return (
			<div>
				<span onClick={() => this.handleStarClick(1, label)}>☆</span>
				<span onClick={() => this.handleStarClick(2, label)}>☆</span>
				<span onClick={() => this.handleStarClick(3, label)}>☆</span>
			</div>
		);
	}

	render() {
		return (
			<div>
				<button type="button" onClick={this.closeModal.bind(this)}>
					Close
				</button>
				<form>
					<section>
						<label>Consultation</label>
						{this.renderStarRating("consultation")}
						<input
							name="consultation"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>On Time</label>
						{this.renderStarRating("ontime")}
						<input
							name="ontime"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Styling</label>
						{this.renderStarRating("styling")}
						<input
							name="styling"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Customer Service</label>
						{this.renderStarRating("customerservice")}
						<input
							name="customerservice"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Overall</label>
						{this.renderStarRating("overall")}
						<input
							name="overall"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<button onClick={() => this.submitUpdates()} type="button">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		creatingFeedback: state.feedback.creatingFeedback
	};
};

export default connect(
	mapStateToProps,
	{
		createFeedback,
		toggleFeedbackForm
	}
)(FeedbackForm);
