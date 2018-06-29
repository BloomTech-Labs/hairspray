import React, { Component } from "react";
import Checkout from "../StripeCheckout";

export default class UserBilling extends Component {
	render() {
		return (
			<div className="billing">
				<div className="title">User Billing</div>
				<Checkout
					name={"Checkout form"}
					description={"To checkout things for stripe"}
					amount={2000}
				/>
			</div>
		);
	}
}
