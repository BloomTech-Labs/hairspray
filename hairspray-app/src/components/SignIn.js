import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { reduxForm, Field } from 'redux-form';

class SignIn extends Component {
  handleFormSubmit = ({ username, password }) => {
    this.props.login(username, password, this.props.history);
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div classname="signin-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Name</label>
            <Field name="name" component="input" type="text" />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field name="password" component="input" type="password" />
          </fieldset>
          <button action="submit">Log In</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated,
  };
};

SignIn = connect(
  mapStateToProps,
  { login }
)(SignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SignIn);
