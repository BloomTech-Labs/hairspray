import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { login } from "../actions";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class SignIn extends Component {
  handleFormSubmit = values => {
    this.props.login(values, this.props.history);
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div classname="signin-form">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset>
              <label>Email</label>
              <Field name="email" component="input" type="email" />
            </fieldset>
            <fieldset>
              <label>Password</label>
              <Field name="password" component="input" type="password" />
            </fieldset>
            <button action="submit">Log In</button>
            {this.renderAlert()}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

SignIn = connect(
  mapStateToProps,
  { login }
)(SignIn);

export default reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(SignIn);
