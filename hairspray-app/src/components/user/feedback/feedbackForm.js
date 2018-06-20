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

		console.log(this.user);
	};

	submitUpdates = () => {
		console.log(this.props.appointment, this.user.scores, this.user.feedback);
		this.props.createFeedback(
			this.props.appointment,
			this.user.scores,
			this.user.feedback
		);
	};

	render() {
		return (
			<div>
				<button type="button" onClick={this.closeModal.bind(this)}>
					Close
				</button>
				<form>
					<section>
						<label>Consultation</label>
						<input
							name="consultation"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>On Time</label>
						<input
							name="ontime"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Styling</label>
						<input
							name="styling"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Customer Service</label>
						<input
							name="customerservice"
							type="text"
							onChange={this.handleInputChange}
						/>
					</section>
					<section>
						<label>Overall</label>
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
