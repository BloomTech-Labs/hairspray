import React, { Component } from "react";
import { connect } from "react-redux";
import './AllFeedback.css';

class AdminFeedbackForm extends Component {
    constructor() {
        super();
        this.edit_feedback = "";
        this.delete_feedback = "";
        this.star_rating = "";
        this.edit_client = "";
        this.edit_stylist = "";
        this.edit_date = "";
    }

    componentDidMount() {
        this.props.getAdminFeedback();
    }

    componentWillReceiveProps() {
        this.props.getAdminFeedback();
    }

    handleEditFeedback = event => {
        this.edit_feedback = event.target.value;
    };

    handleDelete = event => {
        this.delete_feedback = event.target.value;
    };

    handleStarRating = event => {
        this.star_rating = event.target.value;
    };

    handleEditClient = event => {
        this.edit_client = event.target.value;
    };

    handleEditDate = event => {
        this.edit_date = event.target.value;
    };

    handleEditStylist = event => {
        this.edit_stylist = event.target.value;
    };

    submitChanges = () => {
        this.props.getAdminFeedback({
            id: this.props.admin.id,
        });
    }

    render() {
        this.props.AdminFeedback.map(feedback => {
            return(
                <div>
                    <form>
                        <label>Stylist Name</label>
                        <input 
                            type = "text"
                            name = "firstname, lastname"
                            onChange = {this.handleEditStylist}
                        />
                        <label>Client Name</label>
                        <input 
                            type = "text"
                            name = "firstname, lastname"
                            onChange = {this.handleEditClient}
                        />
                        <label>Edit Date</label>
                        <input 
                            type = "date"
                            onChange = {this.handleEditDate}
                        />
                        <button onClick = {() => this.submitChanges()} type = "button">
                            Submit 
                        </button>
                    </form>
                    <form action = "">
                        <label>Star Rating</label>
                        <input
                            button = "Edit Star Rating"
                            onclick = {this.handleStarRating}
                        />
                        <label>Edit Feedback</label>
                        <input 
                            button = "Edit Feedback" 
                            onclick = {this.handleEditFeedback}
                        />
                        <label>Delete Feedback</label>
                        <input
                            button = "Delete Feedback" 
                            onclick = {this.handleDelete}
                        />
                    </form>
                </div>
            );
        });
    }
}

const mapStateToProps = state => {
    return {
      AdminFeedback: state.AdminFeedback,
      userId: state.auth.user,
    };
  };


export default connect(mapStateToProps, { getAdminFeedback })(AdminFeedbackForm);