import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangeName = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangePhone = event => {
    this.setState({
      phone: event.target.value,
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value,
      confirmPassword: event.target.value,
    });
  };

  render() {
    return (
      <div className="SignUp">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </FormGroup>

          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </FormGroup>

          <FormGroup controlId="phone" bsSize="large">
            <ControlLabel>phone</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.phone}
              onChange={this.handleChangePhone}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChangePassword}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up for a New Account
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUp;
