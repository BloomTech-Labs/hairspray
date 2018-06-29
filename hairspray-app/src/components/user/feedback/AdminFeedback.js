import React, { Component } from "react";
import { connect } from "react-redux";
import getAllFeedback from "../../../actions"
import { Link } from "react-router-dom";


class AdminFeedback extends Component {
    constructor() {
        super();
        // this.edit_feedback = {};
        // this.delete_feedback = {} ;
        this.star_rating = {} ;
        this.edit_client = {} ;
        this.edit_stylist = {} ;
        this.edit_date = {} ;
    this.rating = null ;
    this.temp_rating = 0 ;
    this.feedbacks = [] ;
    }
    
    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.user.feedback[name] = value;
    };

    renderFeedback () {
        if (this.props.getAllFeedback || this.props.feedback === undefined) {
            return <div>Getting Feedback</div>;
        }
    }

    render() {
        return (
            <div>
                <button type = "button" onClick = {this.closeModal.bind(this)}>
                    Close 
                </button>
                <form>
                    <section>
                        <label>Stylist: Steven Magadan</label>
                        {this.renderStarRating("Stylist")}
                    </section>
                </form>
        
            <div className = 'sidebar'>
                <div className = 'Schedule'> 
                    <Link to="/"></Link>
                </div>
                <div className = 'Feedback'>
                    <Link to="/"></Link>
                </div>
                <div className = 'Billing'>
                    <Link to="/"></Link>
                </div>
                <div className = 'Settings'>
                    <Link to="/"></Link>
                </div>
            </div>   
            </div>
        )
    }


    // submitUpdates = () => {
    //     this.props.createFeedback(
    //         this.edit_feedback,
    //         this.star_rating,
    //         this.edit_client,
    //         this.edit_stylist,
    //         this.edit_date,
    //         this.delete_feedback,
    //     );
    // };

    // rate(label, rating) {
    // this.user.scores[label] = rating + 1;
    // this.temp_rating = this.user.scores[label];
    // }

    // star_over(label, rating) {
    // this.temp_rating = this.user.scores[label];
    // this.user.scores[label] = rating + 1;
    // this.forceUpdate();
    // }

    // star_out(label) {
    // this.user.scores[label] = this.temp_rating;
    // this.forceUpdate();
    // }

    // renderStarRating(label) {
    //     let stars = [];
    //     for(let i = 0; i < 3; i++) {
    // let starClass = "star_rating";
    
    // if (this.user.scores[label] > i && this.user.scores[label] != null) {
    //             starClass += " is-selected ";
    // }       
    //         stars.push(
    //             <label
    //                 className = {starClass}
    //                 onClick = {() => this.rate(label, i)}
    //                 onMouseOver = {() => this.star_over(label, i)}
    //                 onMouseOut = {() => this.star_out(label, i)}
    //             >
    //                 ★
    //             </label>
    //         );
    //     }
    //     return <div>{stars}</div>;
    // }

   

    
    componentDidMount() {
        this.props.getAdminFeedback();
    }

    // handleEditFeedback = event => {
    //     this.edit_feedback = event.target.value;
    // };

    // handleDelete = event => {
    //     this.delete_feedback = event.target.value;
    // };

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
        feedback: state.feedback,
        feedbacks: state.feedback.feedbacks,
        getAllFeedback: state.feedback.getAllFeedback
    };
  };


export default connect(
    mapStateToProps, 
    { 
        getAllFeedback
    }
)(AdminFeedback);