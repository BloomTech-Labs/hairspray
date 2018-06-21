import React, { Component } from "react";
import { connect } from "react-redux";
import { createFeedback, toggleFeedbackForm } from "../../../actions";
import "../../../styles/feedbackForm.css";

class FeedbackForm extends Component {
	constructor(props) {
		super();
		this.user = {};
		this.user.scores = {};
		this.user.feedback = {};
		this.appointment = props.appointment;
		this.rating = null;
		this.temp_rating = 0;
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

	rate(label, rating) {
		this.user.scores[label] = rating + 1;
		this.temp_rating = this.user.scores[label];
	}

	star_over(label, rating) {
		this.temp_rating = this.user.scores[label];
		this.user.scores[label] = rating + 1;
		this.forceUpdate();
	}

	star_out(label) {
		this.user.scores[label] = this.temp_rating;
		this.forceUpdate();
	}

	renderStarRating(label) {
		let stars = [];
		for (let i = 0; i < 3; i++) {
			let starClass = "star_rating";

			if (this.user.scores[label] > i && this.user.scores[label] != null) {
				starClass += " is-selected";
			}

			stars.push(
				<label
					key={i}
					className={starClass}
					onClick={() => this.rate(label, i)}
					onMouseOver={() => this.star_over(label, i)}
					onMouseOut={() => this.star_out(label, i)}
				>
					★
				</label>
			);
		}
		return <div>{stars}</div>;
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
