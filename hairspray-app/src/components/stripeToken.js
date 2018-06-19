import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./stripeToken.css";
import axios from "axios";

const SERVER = process.env.REACT_SERVER || "http://localhost:5000";

const invalidPayment = data => {
  alert("There was an error in the payment");
};

class _StripeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      email: null,
      password: null
    };
    this.nextPage = this.nextPage.bind(this);
  }

  // This is supposed to make a new token
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit();
    this.props.stripe.createToken().then(payload => {
      if (payload.token) {
        this.onToken(payload.token);
      }
    });
  };

  onToken = token => {
    axios
      .post(`${SERVER}/stripeuser`, {
        description: "haircut",
        source: token.id,
        email: document.getElementById("email").value
      })
      .then(createdCustomer => {
        this.setState(() => ({
          email: createdCustomer.data.email,
          customerID: createdCustomer.data.id,
          password: document.getElementById("password").value
        }));
      })
      .catch(errorPayment);
  };
}


chargeCustomer = () => {
    axios.post(`${SERVER}/charge`, {
        customer: this.state.customerID,
    })
}




createNewUser = () => {
    const {
        email,
        password,
        customerID
    } = this.state;
    axios.post()
}








const StripeForm injectStripe(_StripeForm);

export default StripeForm