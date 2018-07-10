import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { register } from "../actions";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class SignUp extends Component {
  constructor() {
    super();
    this.signup = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.signup[name] = value;
  };

  submitUpdates = () => {
    this.props.register(this.signup, this.props.history);
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup">
        <div className="signup-form">
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="name"
                onChange={this.handleInputChange}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                name="phone"
                onChange={this.handleInputChange}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                name="email"
                onChange={this.handleInputChange}
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                onChange={this.handleInputChange}
                type="password"
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                onChange={this.handleInputChange}
                type="password"
              />
            </FormGroup>
            <Button onClick={() => this.submitUpdates()} type="button">
              Signup
            </Button>
            <div>
              <Link to="/signin">Sign In</Link>
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
    error: state.auth.error
  };
};

SignUp = connect(
  mapStateToProps,
  { register }
)(SignUp);

export default reduxForm({
  form: "signup",
  fields: ["name", "phone", "email", "password", "confirmPassword"]
})(SignUp);
