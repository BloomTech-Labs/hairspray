import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const SERVER = "https://obscure-island-58835.herokuapp.com/api";

const CURRENCY = "USD";
const successPayment = data => {
  alert("Payment Successful");
  console.log(data);
};

const errorPayment = data => {
  alert("Payment Error");
  console.log(data);
};

const onToken = (amount, description) => token =>
  axios
    .post(`${SERVER}/charge`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={"pk_test_GrN1cUmXTG8g6u5D9sFoRUgp"}
  />
);

export default Checkout;
