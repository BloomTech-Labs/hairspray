import React, { Component } from "react";
import { connect } from "react-redux";
import { createFeedback, toggleFeedbackForm } from "../../../actions";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";
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
				<Label
					key={i}
					className={starClass}
					onClick={() => this.rate(label, i)}
					onMouseOver={() => this.star_over(label, i)}
					onMouseOut={() => this.star_out(label, i)}
				>
					★
				</Label>
			);
		}
		return <div>{stars}</div>;
	}

	render() {
		return (
			<div>
				<div className="close" onClick={this.closeModal.bind(this)}>
					✖
				</div>
				<Form className="feedback__form">
					<FormGroup>
						<Label>Consultation</Label>
						{this.renderStarRating("consultation")}
						<Input
							name="consultation"
							type="textarea"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>On Time</Label>
						{this.renderStarRating("ontime")}
						<Input
							name="ontime"
							type="textarea"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Styling</Label>
						{this.renderStarRating("styling")}
						<Input
							name="styling"
							type="textarea"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Customer Service</Label>
						{this.renderStarRating("customerservice")}
						<Input
							name="customerservice"
							type="textarea"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Overall</Label>
						{this.renderStarRating("overall")}
						<Input
							name="overall"
							type="textarea"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<Button className="feedback__form__button" onClick={() => this.submitUpdates()} type="button">
						Submit
					</Button>
				</Form>
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
