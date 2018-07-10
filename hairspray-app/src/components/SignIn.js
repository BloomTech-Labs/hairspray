import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { login } from "../actions";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SignIn extends Component {
  constructor() {
    super();
    this.login = { email: "", password: "" };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.login[name] = value;
  };

  submitUpdates = () => {
    this.props.login(this.login, this.props.history);
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    return (
      <div className="signin">
        <div classname="signin-form">
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Button onClick={() => this.submitUpdates()} type="button">
              Log In
            </Button>
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>

            {this.renderAlert()}
          </Form>
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
